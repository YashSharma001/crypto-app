import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ExchangeCard = ({ name, image, url, rank }) => {
    return (
        <Link to={url} target={"blank"}>

            <VStack w={"52"} shadow={"lg"} m={"4"} p={"7"} borderRadius={"xl"} transition={"all 0.3s"} css={{"&:hover":{transform:"scale(1.1)"}}} >
                <Image src={image} w={"10"} h={"10"} objectFit={"contain"} />
                <Heading size={"md"} noOfLines={1}>{rank}</Heading>
                <Text noOfLines={1}>{name}</Text>
            </VStack>

        </Link>
    )
}

export default ExchangeCard
