import React, {useEffect, useMemo, useState} from "react";
import {Select} from "@chakra-ui/react";
import cs from "../../utils/ConsoleStyles";

export const AreaSelect: React.FC<{
    value: string,
    onChange: (e: any) => void
}> = ({value, onChange}) => {

    console.info('%c[AreaSelect] onRender', cs.info, [onChange])

    const [areas, setAreas] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then(res => res.json())
            .then(data => {
                const arr = data.meals.map((it: any) => it.strArea);
                console.error(arr);
                setAreas(arr);
            })
    }, []);


    return (<>
        <Select
            aria-label={`Areas`}
            name="areas"
            maxWidth={300}
            defaultValue={''}
            onChange={onChange}
            placeholder="Areas"
        >
            <option key={'id-0'} value="">All Areas</option>
            {useMemo(
                () => areas.map(
                    (areaName, k) => (
                        <option key={`${k}-areaName`} value={`${areaName}`}>
                            {areaName}
                        </option>
                    )),
                [areas])
            }
        </Select>
    </>);
};
