import * as React from 'react'; 
import { 
    NativeBaseProvider, 
    Center, 
    Heading, 
    Text, 
    Button
} from 'native-base';
import { appRoutes } from '../../../config';

const VendorDetail = ({navigation}) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Heading> 
                    Oops, No Vendor
                </Heading>
                <Text fontSize="md"> 
                    Your vendor list is empty - click add vendor button to add vendor
                </Text>
            </Center>
        </NativeBaseProvider>
    )
}

export default VendorDetail