import React, { use, useState } from "react";
import Head from "next/head";
import { Flex, Heading, Button, Link as ChakraLink, useMediaQuery, Text, useDisclosure } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from "@/services/api";

import { ModalInfo } from "@/components/modal";

export interface HaircutItemProps {
    id: string
    customer: string
    haircut: {
        id: string
        name: string
        price: string | number
        user_id: string
    }
}

interface ServicoProps {
    servico: HaircutItemProps[]
}


export default function Dashboard({ servico }: ServicoProps) {
    const [ismobile] = useMediaQuery("(max-width: 500px)")
    const [list, setList] = useState(servico)
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [service, setService] = useState<HaircutItemProps>()

    function handleModal(item: HaircutItemProps) {
        setService(item)
        onOpen()
    }
    async function handleFinish(id: string) {
        try {
            const apiClient = setupAPIClient()
            await apiClient.delete("/schedule", {
                params: {
                    schedule_id: id
                }
            })

            const filterItem = list.filter(item => {
                return (item?.id !== id)
            })
            setList(filterItem)

            onClose();

        } catch (error) {
            console.log(error);
            onClose();
            alert("Error ao finalizar ")

        }

    }
    return (
        <>
            <Head>
                <title>BarberPro - Minha barbearia</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"}
                    align={"flex-start"}
                    justify={"flex-start"}
                >
                    <Flex
                        w={"100%"}
                        direction={"row"}
                        align={"center"}
                        justify={"flex-start"}
                    >
                        <Heading color={"white"}
                            fontSize={"3xl"}
                            mt={4}
                            mb={4}
                            mr={4}

                        >Agenda</Heading>
                        <Link href={"/new"}>
                            <Button bg={"#24262D"}
                                color={"white"}
                                p={4}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                _hover={{ bg: "" }}
                                mr={4}>Registrar</Button>
                        </Link>
                    </Flex>


                    {list.map(item => (
                        <ChakraLink
                            onClick={() => handleModal(item)}
                            key={item.id}
                            w={"100%"}
                            m={0}
                            p={0}
                            mt={1}
                            bg={"transparent"}
                            style={{ textDecoration: "none" }}
                        >
                            <Flex
                                w={"100%"}
                                direction={ismobile ? "column" : "row"}
                                p={4}
                                roundedRight={4}
                                mb={2}
                                bg={"barber.400"}
                                justify={"space-between"}
                                align={ismobile ? "flex-start" : "center"}
                            >
                                <Flex direction={"row"}
                                    mb={ismobile ? 2 : 0}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <IoMdPerson
                                        size={28}
                                        color={"orange"}
                                    />
                                    <Text
                                        noOfLines={1}
                                        fontWeight={"bold"} ml={4} color={"white"}>{item.customer}</Text>
                                </Flex>
                                <Text mb={ismobile ? 2 : 0} fontWeight={"bold"} color={"white"}>{item.haircut.name}</Text>
                                <Text mb={ismobile ? 2 : 0} fontWeight={"bold"} color={"white"}> R$ {item.haircut.price}</Text>
                            </Flex>
                        </ChakraLink>
                    ))}
                </Flex>

            </Sidebar >
            <ModalInfo
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                data={service}
                finishiService={() => handleFinish(service.id)}
            />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {

        const apiClient = setupAPIClient(ctx)
        const response = await apiClient("/schedule")

        return {
            props: {
                servico: response.data
            }
        }

    } catch (error) {
        console.log(error)
        return {
            props: {
                servico: []
            }
        }

    }


})