import React, { useState, useContext } from "react"
import Head from "next/head"
import { Flex, Center, Input, Button, Text } from "@chakra-ui/react"
import Image from "next/image"
import logoImg from '../../../public/images/logo.svg'
import Link from "next/link"
import { AuthContext } from "@/contexts/AuthContext"
import { canSSRAGuest } from "@/utils/canSSRAGuest"

export default function Register() {
    const { signUp } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister(){
        if (name === "" && email === "" && password === "") {
            return;
        }

        await signUp({
            email, name, password
        })

    }

    return (
        <>
            <Head>
                <title> Crie sua conta no BaberPro </title>
            </Head>
            <Flex
                height="100vh"
                alignItems="center"
                justifyContent="center"
                background="barber.900">
                <Flex width={640} direction={"column"} p={"14"} rounded={8}>
                    <Center p={4} background="barber.900">
                        <Image
                            src={logoImg}
                            quality={100}
                            objectFit="fill"
                            alt="Logo barberPro"
                        />
                    </Center>
                    <Input
                        background="barber.400"
                        color="white"
                        size="lg"
                        border={0}
                        placeholder="Nome da barbearia"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        mb={3}
                    />
                    <Input
                        background="barber.400"
                        color="white"
                        size="lg"
                        border={0}
                        placeholder="email@email.com"
                        type="email"
                        mb={3}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        background="barber.400"
                        color="white"
                        size="lg"
                        border={0}
                        placeholder="***********"
                        type="text"
                        mb={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        onClick={handleRegister}
                        bg="button.cta"
                        color={"gray.900"}
                        marginBottom={6}
                        size={"lg"}
                        _hover={{ bg: "#ffb13e" }}
                    >
                        Cadastrar
                    </Button>

                    <Center background="barber.900" mt={2} >
                        <Link href="/login">
                            <Text color={"white"}>
                                Já possui uma conta? <strong>Faça o login</strong>
                            </Text>
                        </Link>
                    </Center>
                </Flex>
            </Flex>
        </>
    )
}

export const getServerSideProps = canSSRAGuest(async (ctx) => {
    return {
        props: {}
    }
})
