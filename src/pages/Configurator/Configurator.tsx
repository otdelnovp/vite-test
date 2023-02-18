import React, { Suspense, useEffect, useRef } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';

import Box from '@mui/material/Box';

import { PageTitle } from '@core/PageTitle/PageTitle';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';

import { Canvas, useFrame, useThree } from 'react-three-fiber';
// import { Stats, OrbitControls } from '@react-three/drei';
import * as three from 'three';

import { useConfiguratorStyles } from './styles';

const Cube = () => {
    const cube = useRef<three.Mesh>();

    // useFrame(() => {
    //     cube.current!.rotation.x += 0.01;
    //     cube.current!.rotation.y += 0.01;
    // });

    return (
        // @ts-ignore
        <mesh ref={cube}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="grey" />
        </mesh>
    );
};

const Scene = () => {
    return (
        <>
            <gridHelper />
            <hemisphereLight groundColor={new three.Color(0xffffff)} intensity={0.61} position={[0, 50, 0]} />
            <directionalLight color={new three.Color(0xffffff)} intensity={0.54} position={[-8, 12, 8]} castShadow />
            <pointLight intensity={1.0} position={[5, 3, 5]} />
            <Cube />
        </>
    );
};

const CalendarProduction = ({ user }: CalendarProductionReduxProps) => {
    const classes = useConfiguratorStyles();
    return (
        <div className={classes.root}>
            <PageTitle title="Конфигуратор" />
            <div className={classes.view}>
                <Canvas
                    // @ts-ignore
                    concurrent={true}
                    camera={{
                        near: 0.1,
                        far: 1000,
                        zoom: 1,
                        fov: 50,
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#ffffff');
                    }}
                >
                    {/* <OrbitControls /> */}
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type CalendarProductionReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(CalendarProduction);
