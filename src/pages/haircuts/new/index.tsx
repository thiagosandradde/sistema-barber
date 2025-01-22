import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Text, Flex, Heading, useMediaQuery, Button, Input } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import  Router  from "next/router";

interface NewProps {
    subscription: boolean
    count: number

}

export default function New({ subscription, count }: NewProps) {
    const [isMobile] = useMediaQuery("(max-width: 500px)")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")


    async function handleCadastrar() {
        if (name === "" || price === "") {
            alert("Preencha todos os dados")
        }

        try {
            const setupCliente = setupAPIClient()
            await setupCliente.post("/haircut", {
                name:name,
                price: Number(price)
            })
            Router.push("/haircuts")

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Head><title>Cadastrar corte</title></Head>
            <Sidebar>
                <Flex direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                >
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w={"100%"}
                        align={isMobile ? "flex-start" : "center"}
                        mb={isMobile ? 4 : 0}
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
                                _hover={{bg:""}}
                            >
                                <FiChevronLeft
                                    size={24}
                                    color="white"
                                />
                                Voltar

                            </Button>
                        </Link>
                        <Heading color={"orange"}
                            mt={4}
                            mb={4}
                            mr={4}
                            fontSize={isMobile ? "28px" : "3xl"}
                        >
                            Modelos de cortes
                        </Heading>
                    </Flex>
                    <Flex
                        maxW={"700px"}
                        bg={"barber.400"}
                        w={"100%"}
                        alignItems={"center"}
                        justify={"center"}
                        pt={8}
                        pb={8}
                        direction={"column"}
                    >
                        <Heading
                            fontSize={isMobile ? "22px" : "3xl"}
                            color={"white"}
                            mb={4}
                        >
                            cadastrar modelo
                        </Heading>

                        <Input
                            placeholder="Nome do corte"
                            color="white"
                            type="text"
                            w={"80%"}
                            bg={"gray.900"}
                            mb={3}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Valor do corte ex: 59.90"
                            color="white"
                            type="text"
                            w={"80%"}
                            mb={4}
                            bg={"gray.900"}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Button
                            w={"80%"}
                            size={"lg"}
                            color={"gray.900"}
                            mb={6}
                            
                            bg={"orange"}
                            _hover={{ bg: "#FFB13e" }}
                            disabled={!subscription && count >= 3}
                            onClick={handleCadastrar}
                        >
                            Cadastrar
                        </Button>

                        {!subscription && count >= 3 && (
                            <Flex direction={"row"} align={'center'}
                                justifyContent={"center"}
                            >
                                <Text color={"white"}>Você atingiu seu limite de corte </Text>
                                <Link href={"/planos"}>
                                    <Text color={"orange"} ml={1}>Seja premium!</Text>
                                </Link>
                            </Flex>
                        )}

                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiCliente = setupAPIClient(ctx)

        const response = await apiCliente.get("/haircut/check")
        const count = await apiCliente.get("/haircut/count")

        return {
            props: {
                subscription: response.data?.subscriptions?.status === 'active' ? true : false,
                count: count.data
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