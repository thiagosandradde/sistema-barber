import { useContext, useState } from "react";
import Head from "next/head";
import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";

interface UserProps {
    id: string
    name: string
    email: string
    endereco: string | null
}

interface ProfileProps {
    user: UserProps
    premium: boolean
}


export default function Profile({ premium, user }: ProfileProps) {

    const { logoutUser } = useContext(AuthContext)
    const [name, setName] = useState(user && user?.name)
    const [endereco, setEndereco] = useState(user && user?.endereco)

    async function handleLogout() {
        await logoutUser();
    }

    async function handleUpdateUser() {

        if (name === '') {
            return
        }

        try {
            const apiCliente = setupAPIClient()
            await apiCliente.put("/users", {
                name: name,
                endereco: endereco
            })
            alert("Dados alterados com sucesso")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <Head>
                <title>Minha Conta - BarberPro</title>
            </Head>

            <Sidebar>
                <Flex direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                >
                    <Flex
                        w={"100%"}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                    >
                        <Heading
                            fontSize={"3xl"}
                            marginTop={4}
                            mb={4}
                            mr={4}
                            color={"orange"}>Minha conta</Heading>
                    </Flex>
                    <Flex maxW="700px"
                        w="100%"
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        bg={"barber.400"}
                        paddingTop={8}
                        pb={8}
                    >
                        <Flex direction={"column"} w={"85%"}>
                            <Text color={"white"} mb={2} fontSize={"xl"}
                                fontWeight={"bold"}
                            >Nome da barbearia:
                            </Text>
                            <Input
                                w={"100%"}
                                background={"gray.900"}
                                placeholder="Nome da sua barbearia"
                                size={"lg"}
                                border={"1px"}
                                mb={3}
                                value={name}
                                color={"white"}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Text color={"white"} mb={2} fontSize={"xl"}
                                fontWeight={"bold"}
                            >Endereço da barbearia:
                            </Text>
                            <Input
                                w={"100%"}
                                background={"gray.900"}
                                placeholder="Endereço da sua barbearia"
                                size={"lg"}
                                border={"1px"}
                                mb={3}
                                value={endereco}
                                color={"white"}
                                onChange={(e) => setEndereco(e.target.value)}

                            />
                            <Text color={"white"} mb={2} fontSize={"xl"}
                                fontWeight={"bold"}
                            >Plano atual:
                            </Text>
                            <Flex
                                direction={"row"}
                                w="100%"
                                mb={3}
                                padding={3}
                                borderWidth={1}
                                rounded={6}
                                bg={"barber.900"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Text color={premium ? "#Fba931" : "#4dffb4"} fontSize={"lg"}>
                                    Plano {premium ? "Premium" : "Grátis"}
                                </Text>

                                <Link href="/planos">
                                    <Box cursor={"pointer"}
                                        padding={3}
                                        paddingLeft={2}
                                        pr={2}
                                        bg={"#00cd52"}
                                        rounded={4}
                                        color={"white"}>
                                        Mudar plano
                                    </Box>
                                </Link>
                            </Flex>

                            <Button bg={"orange"}
                                w={"100%"}
                                mt={3}
                                mb={4}
                                size={"lg"}
                                _hover={{ bg: "#ffb13e" }}
                                onClick={handleUpdateUser}
                            >
                                Salvar
                            </Button>
                            <Button
                                w={"100%"}
                                mb={6}
                                background={"transparent"}
                                borderWidth={2}
                                borderColor={"red.500"}
                                color={"red.500"}
                                size={"lg"}
                                _hover={{ bg: "trasparent" }}
                                onClick={handleLogout}
                            >
                                Sair da conta
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiCliet = setupAPIClient(ctx)
        const response = await apiCliet.get("/me")

        const user = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            endereco: response.data.endereco,
        }
        return {
            props: {
                user: user,
                premium: response.data?.subscriptions?.status === 'active' ? true : false
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