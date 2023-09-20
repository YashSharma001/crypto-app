import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import img2 from "../assets/img2.jpeg"

const Footer = () => {
    return (
        <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.900"} minH={"48"} px={"16"} py={["16", "8"]}>
            <Stack direction={['column', 'row']} h={"full"} alignItems={'center'}>
                <VStack w={'full'} alignItems={['center', 'flex-start']}>
                    <Text fontWeight={'bold'} fontSize={'xx-large'}>About US</Text>
                    <Text textAlign={['center', 'left']} fontSize={'sm'} letterSpacing={'widest'}>We are the best crypto trading app in India, we provide our guidance at a very affordable prices.</Text>
                </VStack>
                <VStack>
                    <Avatar src={img2} boxSize={"28"} mt={['4', '8']} />
                    <Text fontSize={'lg'} fontWeight={'semibold'}>Our Founder</Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer
