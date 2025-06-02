import { useResponsiveWidth } from '@/hooks'
import React from 'react'
import { DimensionValue, StyleSheet, ViewProps } from 'react-native'
import ThemedContainer, { ThemedContainerProps } from '../ThemedContainer'

type PageContainerProps = {
    fullScreenWidth: DimensionValue
    paddingSize?: ThemedContainerProps['paddingSize']
    paddingVertical?: ThemedContainerProps['paddingVertical']
    paddingHorizontal?: ThemedContainerProps['paddingHorizontal']
} & ViewProps
const PageContainer = ({
    fullScreenWidth,
    paddingSize,
    paddingHorizontal,
    paddingVertical,
    children,
}: PageContainerProps) => {
    const { viewport } = useResponsiveWidth()
    return (
        <ThemedContainer
            paddingSize={paddingSize}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            style={[
                viewport == 'smlDesktop' || viewport == 'lrgDesktop' ? { width: fullScreenWidth } : { width: '100%' },
                { flex: 1 },
            ]}>
            {children}
        </ThemedContainer>
    )
}

export default PageContainer

const styles = StyleSheet.create({})
