import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Link
  } from '@chakra-ui/react';
  import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from 'react-icons/md';
  import { BsGithub, BsPerson, BsTelegram, BsWhatsapp } from 'react-icons/bs';

  import sbcontract_abi from "../contract_abi/sb_contract_abi.json";

  const contractAddr = "0x526a4000503c2982e68Bc632A97285F9Dc60d45F";

  import {ethers} from "ethers";

  import {useState, useEffect} from "react";
  
  export default function Form() {

  const [wallet, setWallet] = useState("0x0");
  const [balance, setBalance] = useState(0);

  const connectWallet = async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contract_sb = new ethers.Contract(contractAddr, sbcontract_abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const Balance = (await contract_sb.balanceOf(signerAddress))/ 10 **18;

    setWallet(signerAddress);
    setBalance(Balance);
  }

    return (
      <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="#02054B"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 10 }}
            pt={{ sm: 2, md: 5, lg: 9 }}
            >
            <Heading 
              textAlign={'center'}
              align={'center'}
              pb={{ sm: 2, md: 5, lg: 7 }}
            >SB Token</Heading>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="solid"
                          color="white"
                          bg="#0D74FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          onClick={connectWallet}
                          >
                          Connect Wallet
                      </Button>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Wallet Address :
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      {wallet}
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Balance : {balance}
                    </Text>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start">
                      <Link  href="https://t.me/swadhinbiswas" target="_blank">
                      <IconButton
                        aria-label="telegram"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: '#0D74FF' }}
                        icon={<BsTelegram size="28px" />}
                      />
                      </Link>
                      <Link  href="https://api.whatsapp.com/send?phone=8801928034856" target="_blank">
                      <IconButton
                        aria-label="whatsapp"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: '#0D74FF' }}
                        icon={<BsWhatsapp size="28px" />}
                      />
                      </Link>
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Number of tokens</FormLabel>
                            <Input type="number" size="md" placeholder='ex.. 500' min="500" max="25000" />
                  
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            type='submit'
                            variant="solid"
                            bg="#0D74FF"
                            size="lg"
                            width="100%"
                            color="white"
                            _hover={{}}>
                            Buy Token
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }