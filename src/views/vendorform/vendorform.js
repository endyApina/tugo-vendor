import * as React from "react"
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  TextArea,
  Button,
  NativeBaseProvider,
  useDisclose,
  Actionsheet,
  Pressable,
  ScrollView,
  useToast
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'react-native-image-picker';
import { appRoutes, GOOGLE_API_KEY } from "../../../config";
import axios from 'axios';

export const AddVendor = ({navigation}) => {
    const [response, setResponse] = React.useState(null);
    const [address, setAddress] = React.useState("");
    const [places, setPlaces] = React.useState([]);
    const [selectGolocation, updateGeolocation] = React.useState({
        lng: "", 
        lat: "",
    })
    const [selectedAddress, updateSelectedAddress] = React.useState("");
    const { isOpen, onOpen, onClose } = useDisclose();
    const toast = useToast();

    const addressInputRef = React.useRef(null);
    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    React.useEffect(() => {
        console.log(selectGolocation)
    }, [selectGolocation])

    const onChangeAddress = (text) => {
        setAddress(text)
        onOpen()
    }

    React.useEffect(() => {
        console.log("gettting selected address")
        console.log(selectedAddress)
        if (selectedAddress) {
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${selectedAddress}&key=${GOOGLE_API_KEY}`)
            .then((response) => { 
                console.log(response.data)
                const {results} = response.data
                if (Array.isArray(results)) {
                    results.forEach(eachResult => {
                        const {geometry, place_id} = eachResult
                        const {location} = geometry
                        const {lat, lng} = location
                        updateGeolocation({
                            lat: lat, 
                            lng: lng
                        })
                    });
                }
            }, (error) => {
                console.log(error)
            })
        }
    }, [selectedAddress])

    const userAddress = async (text) => {
        setAddress(text)
        var placesSeached = []
        axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?region=ng&key=${GOOGLE_API_KEY}&input=${text}`)
        .then((response) => {
            const {predictions} = response.data
            if (Array.isArray(predictions)) {
                predictions.forEach(predict => {
                    const {
                        description, 
                        matched_substrings, 
                        place_id, 
                        reference, 
                        structured_formatting, 
                        terms, 
                        types
                    } = predict
                    placesSeached.push(description)
                });
            }
            
        }, (error) => {
            console.log(error)
        })
        setTimeout(() => {
            setPlaces(placesSeached)
            if (places.length == 0 && placesSeached.length > 0) {
                setTimeout(() => {
                    setPlaces(placesSeached)
                }, 1000);
            }
        }, 1000);
        console.log(places)
    }

    return (
        <>
        <ScrollView>
            <Box safeArea p="2" py="8" px="8" w="100%" maxW="410">
            <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                color: "warmGray.50",
                }}
            >
                New Gas Station
            </Heading>
            <Heading
                mt="1"
                _dark={{
                color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
            >
                Fill in details to add new gas station
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input 
                        placeholder="Enter name of gas station"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Manager's Name</FormControl.Label>
                    <Input 
                        placeholder="Enter gas station manager's name"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Manager's Phone Number</FormControl.Label>
                    <Input 
                        placeholder="Enter station manager's phone number"
                        keyboardType="numeric"
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Address</FormControl.Label>
                    <Input 
                        placeholder="Enter gas station's address"
                        onChangeText={text => onChangeAddress(text)}
                        value={address}
                    />
                </FormControl>
                <FormControl> 
                    <FormControl.Label>Description</FormControl.Label>
                    <TextArea
                        h={20}
                        placeholder="Short description about gas station"
                        w={{
                            base: "100%",
                            md: "25%",
                        }}
                    />
                </FormControl>
                <Button
                    leftIcon={<Ionicons name="cloud-upload" size={25} color="#2e2e2e" />}
                    onPress={() => {
                        ImagePicker.launchImageLibrary({
                            maxHeight: 200,
                            maxWidth: 200,
                            selectionLimit: 0,
                            mediaType: 'photo',
                            includeBase64: false,
                        }, setResponse)
                    }}
                >
                    Upload Station Image
                </Button>
                <Button 
                    mt="2" 
                    colorScheme="indigo"
                    onPress={() => {
                        toast.show({
                            title: "Station Added",
                            status: "success",
                            description: "Redirecting to gas station list...",
                        })
                        setTimeout(() => {
                            navigation.navigate(appRoutes.vendorList)
                        }, 2000);
                    }}
                >
                    Add Station
                </Button>
            </VStack>
            </Box>
        </ScrollView>
        <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
                <Actionsheet.Content borderTopRadius="0" mt="12">
                    <FormControl>
                        <FormControl.Label>Address</FormControl.Label>
                        <Input 
                            placeholder="Enter gas station's address"
                            value={address}
                            onChangeText={text => userAddress(text)}
                            // ref={refCallback(addressInputRef)}
                            autoFocus={true}
                        />
                    </FormControl>
                    <ScrollView w="100%"> 
                        {
                            Array.isArray(places) ?
                            places.map((item, index) => {
                                return (
                                    <Actionsheet.Item 
                                        onPress={() => {
                                            onClose()
                                            setAddress(item)
                                            updateSelectedAddress(item)
                                        }}
                                        key={item}
                                    >
                                        {item}
                                    </Actionsheet.Item>
                                )
                            })
                            :
                            null
                        }
                    </ScrollView>
                </Actionsheet.Content>
        </Actionsheet>
      </>
    )
}

export default ({navigation}) => {
  return (
    <NativeBaseProvider>
        <AddVendor navigation={navigation} />
    </NativeBaseProvider>
  )
}

//source https://github.com/react-native-image-picker/react-native-image-picker/blob/main/example/src/App.tsx