import {Center, Heading} from "@chakra-ui/react";
import React from "react";

export const MealsHeader:React.FC<{}> = () => <header className="App-header">
    <Center>
        <Heading as='h2' size='3xl' noOfLines={1}>
            Pento Recipe App
        </Heading>
    </Center>
</header>;
