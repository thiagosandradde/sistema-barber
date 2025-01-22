import { useState, ChangeEvent } from "react";
import Head from "next/head";
import { Flex, Text, Heading, Button, useMediaQuery, Input, Stack, Switch, } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";


interface HaircutProps {
    id: string
    name: string
    price: number | string
    status: boolean
    user_id: string
}
interface SubscriptionProps {
    id: string
    status: string
}

interface EditProps {
    haircut: HaircutProps
    subscription: SubscriptionProps | null
}


export default function EditHaircut({ haircut, subscription }: EditProps) {
    const [isMobile] = useMediaQuery("(max-width: 500px)")

    const [nome, setNome] = useState(haircut?.name)
    const [price, setPrice] = useState(haircut?.price)
    const [status, setStatus] = useState(haircut?.status)

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled")

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "disabled") {
            setDisableHaircut("enabled")
            setStatus(false)
        } else {
            setDisableHaircut("disabled")
            setStatus(true)
        }
    }

    async function handleUpdateCorte() {
        if (nome === '' || price === '') {
            return
        }
        try {
            const apiClient = setupAPIClient()
            await apiClient.put("/haircut", {
                name: nome,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id
            })
            alert("Corte atualizado com sucesso")
            Router.push("/haircuts")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Head>
                <title>Editando modelo de corte - BarberPRO</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                >

                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w={"100%"}
                        alignItems={isMobile ? "flex-start" : "center"}
                        justifyContent={""}
                        mb={isMobile ? "4" : "0"}
                    >


                        <Link href={"/haircuts"}>
                            <Button
                                bg={"#24262D"}
                                color={"white"}
                                p={4}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mr={4}

                            >
                                <FiChevronLeft
                                    size={24}
                                    color="white"
                                />
                                Voltar
                            </Button>

                        </Link>

                        <Heading
                            fontSize={isMobile ? "22px" : "3xl"}
                            color={"orange"}>Editar corte</Heading>
                    </Flex>

                    <Flex
                        maxWidth={"700"}
                        pt={8}
                        pb={8}
                        w={"100%"}
                        bg={"barber.400"}
                        direction={"column"}
                        align={"center"}
                        justify={"center"}
                        mt={4}
                    >
                        <Heading
                            color={"white"}
                            fontSize={isMobile ? "22px" : "3xl"}
                            mb={4}
                        >
                            Editar corte
                        </Heading>
                        <Flex w={"85%"} direction={"column"}>
                            <Input
                                placeholder="Nome do corte"
                                color="white"
                                type="text"
                                bg={"gray.900"}
                                mb={3}
                                disabled={subscription?.status !== "active"}
                                size={"lg"}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                placeholder="Valor do corte Ex: 45.90"
                                color="white"
                                type="text"
                                bg={"gray.900"}
                                mb={3}
                                disabled={subscription?.status !== "active"}
                                size={"lg"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <Stack mb={6} align={"center"} direction={"row"}>
                                <Text
                                    color={"white"}
                                    fontWeight={"bold"}
                                >
                                    Desativar corte
                                </Text>
                                <Switch
                                    size={"lg"}
                                    colorScheme="red"
                                    disabled={subscription?.status !== "active"}
                                    value={disableHaircut}
                                    isChecked={disableHaircut === 'disabled' ? false : true}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                                />

                            </Stack>
                            <Button
                                w={"100%"}
                                size={"lg"}
                                color={"gray.900"}
                                mb={6}
                                bg={"orange"}
                                _hover={{ bg: "#FFB13e" }}
                                onClick={handleUpdateCorte}
                                disabled={subscription?.status !== "active"}
                            >
                                Salvar
                            </Button>
                            {subscription?.status !== "active" && (
                                <Flex direction={"row"} align={'center'}
                                    justifyContent={"center"}
                                >
                                    <Link href={"/planos"}>
                                        <Text color={"orange"} >Seja premium </Text>
                                    </Link>
                                    <Text color={"white"} ml={1}> e tenha todos os acessos liberados</Text>
                                </Flex>
                            )}

                        </Flex>
                    </Flex>


                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const { id } = ctx.params
    try {

        const apiClient = setupAPIClient(ctx)

        const check = apiClient.get("/haircut/check")

        const response = await apiClient.get("/haircut/detail", {
            params: {
                haircut_id: id,
            }
        })
        return {
            props: {
                haircut: response.data,
                subscription: (await check).data?.subscriptions
            }
        }


    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: "/haircuts",
                permanent: false
            }
        }
    }

})