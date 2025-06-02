import { ThemedText } from '@/components'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { useResponsiveWidth } from '@/hooks'
import { Posse } from '@/models/posse'
import { borderRadius, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

type PosseListItemType = {
    item: Posse
    onListItemPress: (posseId: string) => void
    onDeletePossePress: (posseId: string) => void
    onAddMemberPress: (posseId: string) => void
}
const PosseListItem = ({ item, onListItemPress, onDeletePossePress, onAddMemberPress }: PosseListItemType) => {
    console.log('🚀 ~ item:', item)
    const { currentTheme } = useTheme()
    const { viewport, isDesktop } = useResponsiveWidth()
    return (
        <Pressable onPress={() => onListItemPress(item.posseId)}>
            <ThemedContainer
                paddingSize="sm"
                style={[
                    {
                        borderRadius: borderRadius,
                        // borderWidth: borderWidth,
                        // borderColor: currentTheme.colors.greyOutline,
                        flexDirection: 'row',
                        backgroundColor: currentTheme.colors.primary,
                    },
                    commonStyles.boxShadow,
                ]}>
                {/* <Image
                    source={require('../../../assets/images/revolver.png')}
                    resizeMode="contain"
                    style={{
                        position: 'absolute',
                        height: 160,
                        width: 50,
                        //   backgroundColor: 'red',
                        right: 80,
                        top: -40,
                        transform: [{ rotate: '70deg' }],
                    }}
                    height={160}
                    width={50}
                /> */}
                <View
                    style={[
                        {
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: padding,
                            //  backgroundColor: Color(currentTheme.colors.secondary).lighten(0.5).hex(),
                            //  borderWidth: borderWidth / 2,
                        },
                        commonStyles.boxShadow,
                    ]}>
                    <ThemedText.Heading headingSize="h2" numberOfLines={2} style={{ textAlign: 'center' }} inverted>
                        {item.name}
                    </ThemedText.Heading>
                </View>
                <View
                    style={{
                        flex: 2,
                        flexDirection: 'row',
                        borderRadius: borderRadius / 3,
                        overflow: 'hidden',
                        padding: padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {item.members.length == 0 && (
                        <View
                            style={[
                                {
                                    flexDirection: 'row',
                                    //  overflow: 'hidden',
                                    borderRadius: borderRadius / 4,
                                    height: 80,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            ]}>
                            <View style={[]}>
                                <ThemedButton
                                    title={'+ Add Members'}
                                    onPress={() => {
                                        onAddMemberPress(item.posseId)
                                    }}
                                    size={'sm'}
                                    type="success"
                                />
                            </View>
                        </View>
                    )}
                    {item.members.map((x, index) => {
                        if (viewport && index == 5) {
                            return (
                                <View
                                    style={[
                                        {
                                            flexDirection: 'row',
                                            //  overflow: 'hidden',
                                            borderRadius: borderRadius / 4,
                                            zIndex: index * -1,
                                            backgroundColor: 'white',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        },
                                    ]}>
                                    <View
                                        style={[
                                            {
                                                borderRadius: borderRadius / 4,
                                                width: 24,
                                                height: 80 - index * 2,
                                                overflow: 'hidden',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            },
                                        ]}>
                                        <ThemedText.Text>
                                            +{itemMembersCount > 5 && itemMembersCount - 5}
                                        </ThemedText.Text>
                                    </View>
                                </View>
                            )
                        }
                        if (index > 4) {
                        } else {
                            return (
                                <View
                                    style={[
                                        {
                                            flexDirection: 'row',
                                            //  overflow: 'hidden',
                                            borderRadius: borderRadius / 4,
                                            zIndex: index * -1,
                                            backgroundColor: 'white',
                                        },
                                        commonStyles.boxShadow,
                                    ]}>
                                    <View
                                        style={[
                                            {
                                                borderWidth: 2,
                                                borderColor: currentTheme.colors.black,
                                                marginLeft: index !== 0 ? -24 : 0,
                                                borderRadius: borderRadius / 4,
                                                width: 50,
                                                height: 80 - index * 2,
                                                overflow: 'hidden',
                                                //   marginTop: index * 12,
                                                //  justifyContent: 'flex-start',
                                                //  alignItems: 'flex-start',
                                            },
                                        ]}>
                                        <Image
                                            //  imageStyle={{ backgroundColor: 'red' }}
                                            source={require('../../../assets/images/cowboy-sharper3.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 160,
                                                width: 50,
                                                //   backgroundColor: 'red',
                                                position: 'absolute',
                                                right: -16,
                                                top: -40,
                                            }}
                                            height={160}
                                            width={50}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
                <Pressable>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Menu>
                            <MenuTrigger>
                                <Entypo name="dots-three-vertical" size={24} color={currentTheme.colors.textInverted} />
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: {} }}>
                                <MenuOption onSelect={() => alert(`Duplicate`)}>
                                    <View style={{ padding: padding }}>
                                        <ThemedText.Text>Edit</ThemedText.Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Duplicate`)}>
                                    <View style={{ padding: padding }}>
                                        <ThemedText.Text>Duplicate</ThemedText.Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => onDeletePossePress(item.posseId)}>
                                    <View style={{ padding: padding }}>
                                        <ThemedText.Text style={{ color: currentTheme.colors.error }}>
                                            Delete
                                        </ThemedText.Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </Pressable>
            </ThemedContainer>
        </Pressable>
    )
}

export default PosseListItem

const styles = StyleSheet.create({})
