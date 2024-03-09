import React, {FunctionComponent} from 'react';
import {useQueryClient} from "@tanstack/react-query";

interface OwnProps {
    isFetching: boolean,
    onChange:(interval:number)=>void
}

type Props = OwnProps;

const RefreshSelect: FunctionComponent<Props> = ({isFetching,onChange}) => {
    const queryClient = useQueryClient()
    const [intervalMs, setIntervalMs] = React.useState(1000)
    const [value, setValue] = React.useState('')
    return (<>
        <label>
            Query Interval speed (ms):{' '}
            <input
                value={intervalMs}
                onChange={(ev) => {
                    const interval =Number(ev.target.value);
                    setIntervalMs(interval);
                    onChange(interval)
                }}
                type="number"
                step="100"
            />{' '}
            <span
                style={{
                    display: 'inline-block',
                    marginLeft: '.5rem',
                    width: 10,
                    height: 10,
                    background: isFetching ? 'green' : 'transparent',
                    transition: !isFetching ? 'all .3s ease' : 'none',
                    borderRadius: '100%',
                    transform: 'scale(2)',
                }}
            />
        </label>
    </>);
};

export default RefreshSelect;
