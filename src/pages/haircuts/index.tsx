import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { Text, Flex, Heading, Button, Stack, Switch, useMediaQuery, Link } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import { IoMdPricetag } from "react-icons/io"
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

interface HaircutItem {
    id: string
    name: string
    price: string | number
    user_id: string
}

interface HaircutsProps {
    haircuts: HaircutItem[]
}


export default function Haircuts({ haircuts }: HaircutsProps) {
    const [isMobile] = useMediaQuery("(max-width: 500px)")
    const [haircutList, sethaircutList] = useState<HaircutItem[]>(haircuts || [])

    const [disableHaicut, setDisableHaircut] = useState("enabled")

    async function handleDisable(e: ChangeEvent<HTMLInputElement>) {
        const apiClient = setupAPIClient()

        if (e.target.value === 'disabled') {
            setDisableHaircut("enabled")

            const response = await apiClient.get("/haircuts", {
                params: {
                    status: true
                }
            })
            sethaircutList(response.data)
        } else {
            setDisableHaircut("disabled")

            const response = await apiClient.get("/haircuts", {
                params: {
                    status: false
                }
            })
            sethaircutList(response.data)
        }

    }

    return (
        <>
            <Head>
                <title>Modelos de corte</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                >
                    <Flex direction={isMobile ? 'column' : "row"}
                        width={"100%"}
                        alignItems={isMobile ? 'flex-start' : "center"}
                        justifyContent={"flex-start"}
                        mb={0}

                    >
                        <Heading
                            fontSize={isMobile ? "28px" : "3xl"}
                            mt={4}
                            mb={4}
                            marginRight={4}
                            color={"orange"}
                        >
                            Modelos de corte
                        </Heading>
                        <Link
                        style={{textDecoration:'none'}}
                        href="/haircuts/new">
                            <Button bg={"#24262D"}
                                color={"white"}
                                p={4}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mr={4}
                                _hover={{ bg: "" }}
                                
                            >

                                Cadastrar novo
                            </Button>
                        </Link>

                        <Stack
                            align={"center"}
                            direction={"row"}
                            ml="auto">
                            <Text fontWeight={"bold"} color={"white"}>ATIVOS</Text>
                            <Switch
                                isChecked={disableHaicut === "disabled" ? false : true}
                                value={disableHaicut}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDisable(e)}
                                colorScheme="green"
                                size={"lg"}

                            />
                        </Stack>

                    </Flex>

                    {haircutList.map(item => (
                        <Link
                            key={item.id}
                            mb={isMobile ? 2 : 0}
                            style={{textDecoration:'none'}}
                            w={"100%"} href={`/haircuts/${item.id}`}>
                            <Flex cursor={"pointer"}
                               
                                p={4}
                                bg={"barber.400"}
                                direction={isMobile ? "column" : "row"}
                                rounded={4}
                                mb={2}
                                justifyContent={"space-between"}
                            >
                                <Flex>
                                    <IoMdPricetag
                                        size={28}
                                        color="orange"
                                    />

                                    <Text color={"white"}
                                        fontWeight={"700"}
                                        ml={"5px"}
                                        noOfLines={2}
                                        
                                    >
                                        {item.name}
                                    </Text>
                                </Flex>
                                <Text fontWeight={"bold"} color={"white"}>
                                    Preço: R$ {item.price}
                                </Text>
                            </Flex>
                        </Link>
                    ))}

                </Flex>
            </Sidebar>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiCliente = setupAPIClient(ctx)
        const response = await apiCliente.get("/haircuts", {
            params: {
                status: true
            }
        })
        if (response.data === null) {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false
                }
            }
        }

        return {
            props: {
                haircuts: response.data
            }
        }

    } catch (err) {
        console.log(err)
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false
            }
        }
    }
})

