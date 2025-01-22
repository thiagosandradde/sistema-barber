import { useState, ChangeEvent } from "react";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";

import { Flex, Text, Heading, Input, Select, Button } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";
interface haircutsProps {
    id: string
    name: string
    price: string | number
    status: boolean
    user_id: string
}

interface Newprops {
    haircuts: haircutsProps[]
}



export default function New({ haircuts }: Newprops) {
    const [customer, setCostumer] = useState("")
    const [haircuSelected, setHaircuSelected] = useState(haircuts[0])

    function handleChangeSelect(e: string) {
        const haircutItem = haircuts.find(item => item.id === e)
        setHaircuSelected(haircutItem)
    }

    async function handleCadastrar() {
        if (customer === '') {
            alert("Preencha o nome")
            return;
        }
        try {
            const apiClient = setupAPIClient()
            await apiClient.post("/schedule", {
                customer: customer,
                haircut_id: haircuSelected?.id
            })
            alert("Agendado com sucesso!")
            Router.push("/dashboard")
        } catch (error) {
            console.log(error)
            alert("Erro ao registrar")
        }
    }

    return (
        <>
            <Head>
                <title>BarberPRO - Registrar cliente</title>
            </Head>
            <Sidebar>
                <Flex
                    direction={"column"}
                    align={"flex-start"}
                    justify={"flex-start"}
                >
                    <Flex
                        direction={"row"}
                        w={"100%"}
                        align={"center"}
                        justify={"start"}
                    >
                        <Heading color={"orange"} fontSize={"3xl"} mt={4} mb={4} mr={4}>
                            Novo corte
                        </Heading>
                    </Flex>
                    <Flex
                        maxW={"700px"}
                        pt={8}
                        pb={8}
                        width={"100%"}
                        direction={"column"}
                        align={"center"}
                        justifyContent={"center"}
                        bg={"barber.400"}
                    >
                        <Input
                            type="text"
                            placeholder="Nome do cliente"
                            w={"85%"}
                            mb={3}
                            size={"lg"}
                            bg={"barber.900"}
                            value={customer}
                            color={"white"}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCostumer(e.target.value)}
                        />
                        <Select
                            color={"white"}
                            mb={3}
                            size={"lg"}
                            w={"85%"}
                            bg={"barber.900"}
                            fontWeight={"600"}
                            onChange={(e) => handleChangeSelect(e.target.value)}
                        >
                            {haircuts?.map(item => (
                                <option style={{ background: "#12131B", color: "white", fontWeight: "600" }} key={item?.id} value={item?.id}> {item.name}</option>
                            ))}
                        </Select>
                        <Button
                            w={"85%"}
                            size={"lg"}
                            bg={"orange"}
                            color={"gray.900"}
                            _hover={{ bg: "#ffb13e" }}
                            onClick={handleCadastrar}
                        >
                            Cadastrar
                        </Button>
                    </Flex>


                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {

        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get("/haircuts", {
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


    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false
            }
        }
    }
})
