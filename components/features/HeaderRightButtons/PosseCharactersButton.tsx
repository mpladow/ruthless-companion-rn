import { ThemedText } from '@/components/ThemedText/ThemedText'
import { padding } from '@/theme/constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

type PosseCharactersButtonProps = {
    onEditPress: () => void
    onAddMemberPress: () => void
    editMode: boolean
}
const PosseCharactersButton = ({ onEditPress, onAddMemberPress, editMode }: PosseCharactersButtonProps) => {
    return (
        <Menu>
            <MenuTrigger>
                <View style={{ flexDirection: 'row' }}>
                    {/* <View style={{ height: 30, width: 30 }}>
                                        <FingerPointing fill={currentTheme.colors.textDefault} />
                                    </View> */}
                    <View
                        style={{
                            //   borderTopWidth: 2,
                            //   paddingTop: 3,
                            //   borderBottomWidth: 2,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            zIndex: 999,
                        }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </View>
                    {/* <View style={{ height: 30, width: 30, transform: [{ scaleX: -1 }] }}>
                                        <FingerPointing fill={currentTheme.colors.textDefault} />
                                    </View> */}
                </View>
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: {} }}>
                <MenuOption onSelect={() => onEditPress()}>
                    <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 4 }}>
                        <ThemedText.Text>{editMode ? 'Close Edit Mode' : 'Edit Mode'}</ThemedText.Text>
                    </View>
                </MenuOption>
                <MenuOption onSelect={() => onAddMemberPress()}>
                    <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 4 }}>
                        <ThemedText.Text>Add Member</ThemedText.Text>
                    </View>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

export default PosseCharactersButton

const styles = StyleSheet.create({})
