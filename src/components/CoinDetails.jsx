import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import axios from 'axios';
import { server } from '../index';
import Chart from './Chart';


const CoinDetails = () => {

  const params = useParams();

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  //for chart componenet
  const [chartArray, setChartArray] = useState([]);
  const [days, setDays] = useState("24h");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]

  const switchChartStats = (i) => {
    switch (i) {
      case "24h":
        setDays("24h");
        setLoading(true)
        break;
      case "7d":
        setDays("7d");
        setLoading(true)
        break;
      case "14d":
        setDays("14d");
        setLoading(true)
        break;
      case "30d":
        setDays("30d");
        setLoading(true)
        break;
      case "60d":
        setDays("60d");
        setLoading(true)
        break;
      case "200d":
        setDays("200d");
        setLoading(true)
        break;
      case "1y":
        setDays("365d");
        setLoading(true)
        break;
      case "max":
        setDays("max");
        setLoading(true)
        break;

      default:
        setDays("24h");
        setLoading(true)
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        setCoin(data)
        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) {
    return <ErrorComponent message={"Error while fetching coin"} />
  }



  return (
    <Container maxW={"container.xl"} >

      {loading ? <Loader /> :
        <>

          <Box w={"full"} borderWidth={2}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={"4"} wrap={"wrap"}>
            {
              btns.map((i) => (
                <Button key={i} onClick={() => { switchChartStats(i) }}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} opacity={0.7} alignSelf={'center'}>
              Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image src={coin.image.large} w={"16"} h={"16"} objectFit={'contain'} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
              <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </Box>

          </VStack>
        </>
      }

    </Container>
  )
}
const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>

    <Progress value={50} w={"full"} colorScheme="teal" />

    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24 Hours Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>

  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontSize={"lg"} fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text fontSize={"lg"}>{value}</Text>
  </HStack>
)

export default CoinDetails
