import Head from "next/head";
import { Flex, Box, Text, Image, Button, useMediaQuery, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
export default function Home() {
  const [ismobile] = useMediaQuery("(max-width: 500px)")
  return (
    <>
      <Head>
        <title>BarberPro - Seu sistema completo</title>
      </Head>
      <Flex
        height="100vh"
        justifyContent="center"
        background="barber.900"
        position="relative"
      >

        <Box position="relative" width="100%" height="600px">

          <Image
            src="/images/banner.jpg"
            alt="Banner da barbearia"
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="md"
          />

          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="linear-gradient(to bottom, rgba(0, 0, 0, 0.13), #12131b)"
            borderRadius="md"
            zIndex="1"
          />

          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
            zIndex="2"
          >
            <Image src="images/logo.svg" w="100%" />
            <Text fontWeight={"bold"} fontSize="18">
              Seu sistema completo para barbearias.
            </Text>
            <Link href={"/login"}>
              <Button
                bg="button.cta"
                color={"gray.900"}
                marginBottom={6}
                size={"lg"}
                w={"70%"}
                mt={15}
                _hover={{ bg: "#ffb13e" }}
                fontSize={19}
              >
                Login
              </Button>
            </Link>
          </Box>
          <Flex
            direction={"row"}
            align={"center"}
            justifyContent={"space-around"}
            bg={"barber.900"}>
            <Image
              src="/images/cabelo.jpg"
              w={ismobile ? "50%" : "30%"}
              mt={50}
              ml={ismobile ? 5 : 50}
              mb={ismobile ? 5 : 50}
              rounded={4}
            />
            <Flex
              w={ismobile ? "150px" : "30%"}
              direction={"column"}>
              <Heading color={"orange"} mb={ismobile ? 2 : 10}>Sobre nós</Heading>
              <Text fontWeight={"medium"} fontSize={ismobile ? 8 : 18}>No BarberPro, nossa missão é transformar a gestão das barbearias, oferecendo soluções práticas e eficientes para facilitar o dia a dia dos profissionais do setor. Somos uma equipe apaixonada pelo que fazemos e comprometida em ajudar barbearias de todos os tamanhos a alcançar o seu pleno potencial.</Text>
            </Flex>
          </Flex>

          <Flex
            direction={ismobile ? "column" : "row"}
            align={"center"}
            justify={ismobile ? "center " : "space-around"}
            bg={"barber.500"}

          >
            <Image
              mt={"10px"}
              src="images/dashboard.png "
              w={ismobile ? "90%" : "30%"}
              maxW={"750px"}
              rounded={4}

            />
            <Flex
              w={ismobile ? "100%" : "30%"} direction={"column"}
              ml={ismobile ? 10 : 0}
              mt={4}
            >
              <Heading mb={ismobile ? 2 : 8} color={"orange"} fontSize={ismobile ? 18 : 30}>
                Plano com Benefícios exclusivos!
              </Heading>

              <Text fontSize={ismobile ? 16 : 18} fontWeight={"medium"}>Com o plano BarberPro Premium, você tem benefícios exclusivos para transformar sua barbearia em um ambiente ainda mais profissional.</Text>
            </Flex>
          </Flex>

          <Flex
            direction={ismobile ? "column" : "row"}
            align={"center"}
            justify={ismobile ? "center " : "space-around"}
            bg={"barber.500"}

          >
            <Flex
              w={ismobile ? "100%" : "30%"} direction={"column"}
              ml={ismobile ? 10 : 0}
              mt={4}
            > <Heading mb={ismobile ? 2 : 8} color={"orange"} fontSize={ismobile ? 18 : 30}>
                Sistema de agendamento completo!
              </Heading>

              <Text fontSize={ismobile ? 16 : 18} fontWeight={"medium"}>Organize seus agendamentos de forma simples e eficiente com nosso sistema completo para barbearias.</Text>


            </Flex>
            <Image
              mt={"10px"}
              src="images/plano.png "
              w={ismobile ? "90%" : "30%"}
              maxW={"750px"}
              rounded={4}
              mb={10}

            />

          </Flex>
          
          <Box
            as="footer"
            bg="barber.900"
            color="white"
            py={8}
            
            textAlign="center"
          >
            <Flex
              direction={ismobile ? "column" : "row"}
              align="center"
              justify="center"
              mb={4}
            >
              <Text fontSize="lg" mr={ismobile ? 0 : 8}>
                © 2025 BarberPro - Todos os direitos reservados
              </Text>
              <Flex justify="center" align="center" gap={4}>
                <Link href="https://facebook.com">
                  <Button
                    variant="link"
                    color="white"
                    fontSize="24px"
                    _hover={{ color: "#3b5998" }}
                  >
                    <FaFacebook />
                  </Button>
                </Link>
                <Link href="https://instagram.com">
                  <Button
                    variant="link"
                    color="white"
                    fontSize="24px"
                    _hover={{ color: "#E1306C" }}
                  >
                    <FaInstagram />
                  </Button>
                </Link>
                <Link href="https://twitter.com">
                  <Button
                    variant="link"
                    color="white"
                    fontSize="24px"
                    _hover={{ color: "#1DA1F2" }}
                  >
                    <FaTwitter />
                  </Button>
                </Link>
              </Flex>
            </Flex>

            <Link href="/login" passHref>
              <Button
                bg="button.cta"
                color="gray.900"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
              >
                Começar
              </Button>
            </Link>
            
          </Box>
          
        </Box>
      </Flex>
    </>
  );
}
