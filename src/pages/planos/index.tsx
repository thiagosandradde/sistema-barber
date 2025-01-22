import Head from "next/head";

import { Flex, Text, Heading, useMediaQuery, Button } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

interface PLanosProps {
    premium: boolean
}

export default function Planos({ premium }: PLanosProps) {
    const [isMobile] = useMediaQuery("(max-width: 500px)")
    return (
        <>
            <Head><title>BarberPro - Sua assinatura Premium</title></Head>
            <Sidebar>
                <Flex
                    direction={"column"}
                    align={"flex-start"}
                    justify={"flex-start"}
                    w={"100%"}

                >
                    <Heading fontSize={"3xl"} color={"white"} mt={4} mb={4} mr={4}>
                        Planos
                    </Heading>
                </Flex>
                <Flex
                    pb={8}
                    maxW={"780px"}
                    w={"100%"}
                    direction={"column"}
                    align={"flex-start"}
                    justifyContent={"flex-start"}
                >
                    <Flex
                        w={"100%"}
                        gap={"4"}
                        flexDir={isMobile ? "column" : "row"}
                    >
                        <Flex
                            rounded={4}
                            p={2}
                            flex={1}
                            bg={"barber.400"}
                            flexDir={"column"}
                            color={"white"}
                        >
                            <Heading
                                textAlign={"center"}
                                fontSize={"2xl"}
                                mt={2}
                                mb={4}

                            >Plano Grátis</Heading>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Registrar cortes.</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Criar apenas 3 modelos de cortes.</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Editar dados do perfil.</Text>
                        </Flex>
                        <Flex
                            rounded={4}
                            p={2}
                            flex={1}
                            bg={"barber.400"}
                            flexDir={"column"}
                            color={"white"}
                        >
                            <Heading
                                textAlign={"center"}
                                fontSize={"2xl"}
                                mt={2}
                                mb={4}
                                color={"#31fb6a"}
                            >Premium</Heading>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Registrar cortes ilimitados.</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Criar modelos ilimitados.</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Editar dados do perfil.</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Editar modelos de cortes</Text>
                            <Text fontWeight={"medium"} ml={4} mb={2}>- Receber todas autalizações</Text>
                            <Text fontWeight={"bold"} color={"#31fb6a"} fontSize={"2xl"} ml={4} mb={2}> R$ 9.99 </Text>

                            <Button bg={premium ? "transparent" : "orange"}
                                disabled={premium}
                                m={2}
                                color={"white"}
                                onClick={() => { }}
                                fontSize={"15"}
                                _hover={{ bg: "" }}
                            >
                                {premium ? (
                                    "VOCÊ JÁ É PREMIUM"
                                ) : (
                                    "VIRAR PREMIUM "
                                )}
                            </Button>
                            {premium && (
                                <Button
                                    margin={2}
                                    fontSize={"15"}
                                    bg={"white"}
                                    color={"barber.900"}
                                    fontWeight={"bold"}
                                    onClick={() => { }}
                                >
                                    ALTERAR ASSINATURA
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get("/me")

        return {
            props: {
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