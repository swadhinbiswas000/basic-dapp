import {ethers} from "ethers";

import {useState, useEffect} from "react";

import sbcontract_abi from "../contract_abi/sb_contract_abi.json";

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

  
  export default function Form() {

  const contractAddr = "0xA846450B48D00582Abe6011faA71F46cEF7b2735";

  const [wallet, setWallet] = useState("0x0");
  const [balance, setBalance] = useState(0);
  const [connected, setConnected] = useState(false);

  const [value, setValue] = useState(0);

  const [txStatus, setTxStatus] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e)=>{
    let _value = e.target.value;
    setValue(_value);
  }

  const handleSubmit = async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const contract_sb = new ethers.Contract(contractAddr, sbcontract_abi, signer);
    let price = await contract_sb.getPrice(value);

  let new_val = price.toString();

  let tx = await contract_sb.buyToken(value, {value: new_val});
  
  setLoading(true);

  let result = await tx.wait();

  if(result){
    setLoading(false)
    setTxStatus(true);
  }

  // await transaction.wait();
  
  // const web3 = window.web3
  // const contract_sb = new web3.eth.Contract(sbcontract_abi, contractAddr);
  // let new_amount = await contract_sb.methods.getPrice(value).call();
  // let newVal = web3.utils.tW
  // await contract_sb.methods.buyToken(value).send({from: signerAddress, value: new_amount});
 
  }

  const connectWallet = async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contract_sb = new ethers.Contract(contractAddr, sbcontract_abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const Balance = (await contract_sb.balanceOf(signerAddress))/ 10 **18;

    setWallet(signerAddress);
    setBalance(Balance);
    setConnected(true);
  }


    return (
      <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
        <p style={{color:"black", marginTop:"15px",backgroundColor:"yellow", padding:"8px"}}>Note: This DAPP is developed on Ropsten Testchain. Please add ropsten to buy tokens</p>
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
                          {connected? "Wallet Connected": "Connect Wallet"}
                      </Button>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Wallet Address :
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      {wallet}
                    </Text>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Balance : {balance} SB
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
                          <FormLabel>Number of tokens (min 500, max 25000)</FormLabel>
                            <Input 
                            type="number" 
                            size="md" 
                            placeholder='ex.. 500' 
                            min="500" max="25000" 
                            value={value} 
                            onChange={handleChange}
                            />
                  
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            type='submit'
                            variant="solid"
                            bg="#0D74FF"
                            size="lg"
                            width="100%"
                            color="white"
                            _hover={{}}
                            onClick={handleSubmit}
                            >
                            Buy Token
                          </Button>
                          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="green" textAlign={'center'}>
                            {txStatus? "Transaction Successful !": ""}
                          </Text>
                          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="black" textAlign={'center'}>
                            {loading? "Transaction Processing.....": ""}
                          </Text>
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