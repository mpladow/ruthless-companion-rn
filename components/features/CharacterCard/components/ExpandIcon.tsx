import ExpandedIndicator from '@/components/Animated/ExpandedIndicator'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type ExpandIconProps = {
    collapsedView: boolean
    handleCollapseAll: () => void
    showText: boolean
}
const ExpandIcon = ({ collapsedView, handleCollapseAll, showText }: ExpandIconProps) => {
    return (
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <ExpandedIndicator isExpanded={!collapsedView} onPress={handleCollapseAll} />
            {showText && (
                <ThemedButton
                    title={collapsedView ? 'Expand All' : 'Collapse All'}
                    onPress={handleCollapseAll}
                    size={'sm'}
                    variant="text"
                />
            )}
        </View>
    )
}

export default ExpandIcon

const styles = StyleSheet.create({})
