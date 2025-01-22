import {
    ModalHeader,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Button
} from "@chakra-ui/react"
import { FiUser, FiScissors } from "react-icons/fi"
import { FaMoneyBillAlt } from 'react-icons/fa'
import { HaircutItemProps } from "@/pages/dashboard"

interface ModalInfoProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    data: HaircutItemProps
    finishiService: () => Promise<void>
}

export function ModalInfo({ data, finishiService, isOpen, onOpen, onClose }: ModalInfoProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg={"barber.400"}>
                <ModalHeader color={"white"}>Próximo</ModalHeader>
                <ModalCloseButton color={"white"} />
                <ModalBody>
                    <Flex align={"center"} mb={3}>
                        <FiUser
                            size={28}
                            color="orange"
                        />
                        <Text ml={2} fontSize={"1xl"} fontWeight={"bold"} color={"white"}>{data?.customer}</Text>
                    </Flex>
                    <Flex align={"center"} mb={3}>
                        <FiScissors
                            size={28}
                            color="white"
                        />
                        <Text ml={2} fontSize={"large"} fontWeight={"bold"} color={"white"}>{data?.haircut.name}</Text>
                    </Flex>
                    <Flex align={"center"} mb={3}>
                        <FaMoneyBillAlt
                            size={28}
                            color="#46ef75"
                        />
                        <Text ml={2} fontSize={"large"} fontWeight={"bold"} color={"white"}>R$ {data?.haircut.price}</Text>
                    </Flex>
                    <ModalFooter>
                        <Button bg="button.cta"
                            color={"gray.900"}
                            size={"lg"}
                            onClick={() => finishiService()}
                            _hover={{ bg: "#ffb13e" }}>
                            Finalizar serviço
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}