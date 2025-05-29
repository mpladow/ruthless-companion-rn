import { ThemedText } from '@/components/ThemedText/ThemedText'
import { BodyPart } from '@/models/bodyParttemplate'
import { margin } from '@/theme/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import HealthSection from './components/HealthSection'

type HealthBarContainerProps = {
    bodyParts?: BodyPart[]
}
const HealthBarContainer = ({ bodyParts }: HealthBarContainerProps) => {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    justifyContent: 'flex-start',
                    marginTop: margin,
                }}>
                <ThemedText.Heading headingSize="h2">Wounds</ThemedText.Heading>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, gap: 1, flexWrap: 'wrap' }}>
                {bodyParts?.map((item, index) => {
                    return <HealthSection key={index} bodyPart={item}/>
                })}
            </View>
        </View>
    )
}

export default HealthBarContainer

const styles = StyleSheet.create({})
