import { ThemedText } from '@/components/ThemedText/ThemedText'
import { BodyPart } from '@/models/bodyParttemplate'
import { margin, padding } from '@/theme/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import HealthSection from './components/HealthSection'

type HealthBarContainerProps = {
    bodyParts?: BodyPart[]
    onHealthChange: (bodyPart: BodyPart) => void
}
const HealthBarContainer = ({ bodyParts, onHealthChange }: HealthBarContainerProps) => {
    const handleHeathSectionChange = (bodyPart: BodyPart) => {
        onHealthChange(bodyPart)
    }
    return (
        <View style={{ flex: 1, padding: padding, paddingHorizontal: padding * 2 }}>
            <View
                style={{
                    justifyContent: 'flex-start',
                    marginTop: margin,
                }}>
                <ThemedText.Heading headingSize="h2">Wounds</ThemedText.Heading>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, gap: 1, justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {bodyParts?.map((item, index) => {
                    return <HealthSection key={index} bodyPart={item} onHealthChange={handleHeathSectionChange} />
                })}
            </View>
        </View>
    )
}

export default HealthBarContainer

const styles = StyleSheet.create({})
