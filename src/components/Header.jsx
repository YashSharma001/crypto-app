import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <HStack p={"4"} bgColor={"blackAlpha.900"} shadow={"base"}>
            <Button variant={"unstyled"} color={"whiteAlpha.900"}>
                <Link to="/">Home</Link>
            </Button>
            <Button variant={"unstyled"} color={"whiteAlpha.900"}>
                <Link to="/exchanges">Exchanges</Link>
            </Button>
            <Button variant={"unstyled"} color={"whiteAlpha.900"}>
                <Link to="/coins">Coins</Link>
            </Button>
        </HStack>
    )
}

export default Header
