import { ThemedText } from '@/components'
import FingerPointing from '@/components/Icons/FingerPointing'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { useResponsiveWidth } from '@/hooks'
import { Posse } from '@/models/posse'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Color from 'color'
import React, { memo } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

type PosseListItemV2Type = {
    item: Posse
    onListItemPress: (posseId: string) => void
    onDeletePossePress: (posseId: string) => void
    onAddMemberPress: (posseId: string) => void
    onEditPossePress: () => void
}

const PosseListItemV2 = ({ item, onListItemPress, onDeletePossePress, onEditPossePress }: PosseListItemV2Type) => {
    const { currentTheme, currentFontFamilies } = useTheme()
    const { viewport, isDesktop } = useResponsiveWidth()
    const getHeightOfPerson = (male: boolean) => {
        if (male) {
            return -45
        } else {
            return -65
        }
    }

    return (
        <Pressable onPress={() => onListItemPress(item.posseId)} style={[commonStyles.boxShadow]}>
            <ThemedContainer
                paddingSize="sm"
                style={[
                    {
                        borderRadius: 0,
                        gap: 6,
                        borderWidth: borderWidth / 2,
                        overflow: 'hidden',
                        // borderColor: currentTheme.colors.greyOutline,
                        flexDirection: 'row',
                        backgroundColor: currentTheme.colors.secondaryLight,
                    },
                    commonStyles.boxShadow,
                ]}>
                <Image
                    source={require('../../../assets/images/card-texture.png')}
                    resizeMode="contain"
                    style={{
                        opacity: 0.2,
                        position: 'absolute',
                        tintColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 999, // Adjust opacity as needed
                    }}
                />
                <View
                    style={[
                        {
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingLeft: padding,
                            flexDirection: 'row',
                            overflow: 'hidden',
                        },
                    ]}>
                    <View
                        style={{
                            borderBottomColor: currentTheme.colors.textDefault,
                        }}>
                        <ThemedText.Heading
                            headingSize="h1"
                            size={28}
                            numberOfLines={2}
                            style={{
                                textTransform: 'uppercase',
                                fontFamily: currentFontFamilies.find((x) => x.family == 'Smokum')?.regular.fontFamily,
                                color: currentTheme.colors.primary,
                            }}>
                            {item.name}
                        </ThemedText.Heading>
                    </View>
                </View>
                <View
                    style={{
                        flex: 2,
                        flexDirection: 'row',
                        overflow: 'hidden',
                        padding: 1,
                        paddingHorizontal: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: currentTheme.colors.grey2,
                        borderWidth: 2,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 0,
                            borderColor: currentTheme.colors.grey2,
                            borderWidth: 2,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Color(currentTheme.colors.secondaryLight).darken(0.3).hex(),
                        }}>
                        <Image
                            source={require('../../../assets/images/card-texture.png')}
                            resizeMode="contain"
                            style={{
                                opacity: 0.2,
                                position: 'absolute',
                            }}
                        />
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
                                        zIndex: 999,
                                    },
                                ]}>
                                <View
                                    style={[
                                        {
                                            paddingHorizontal: margin,
                                            zIndex: 999,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        },
                                    ]}>
                                    <View style={{ height: 24, width: 24 }}>
                                        <FingerPointing fill={currentTheme.colors.textDefault} />
                                    </View>
                                    <ThemedText.Text>Now Hiring</ThemedText.Text>
                                    <View style={{ height: 24, width: 24, transform: [{ scaleX: -1 }] }}>
                                        <FingerPointing fill={currentTheme.colors.textDefault} />
                                    </View>
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
                                                //   backgroundColor: 'white',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginLeft: -10,
                                            },
                                        ]}>
                                        <View
                                            style={[
                                                {
                                                    borderRadius: borderRadius / 4,
                                                    width: 24,
                                                    height: 80,
                                                    overflow: 'hidden',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                },
                                            ]}>
                                            <ThemedText.Text type="bold">
                                                +{item.members.length > 5 && item.members.length - 5}
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
                                                // overflow: 'hidden',

                                                zIndex: index * -1,
                                                // backgroundColor: 'white',
                                            },
                                            commonStyles.boxShadow,
                                        ]}>
                                        <View
                                            style={[
                                                {
                                                    // borderWidth: 2,
                                                    // borderColor: currentTheme.colors.black,
                                                    marginLeft: index !== 0 ? -24 : 0,
                                                    borderRadius: 0,
                                                    width: 45,
                                                    height: 80,
                                                    overflow: 'hidden',
                                                    //   marginTop: index * 12,
                                                    //  justifyContent: 'flex-start',
                                                    //  alignItems: 'flex-start',
                                                },
                                            ]}>
                                            {x.gender == 'male' ? (
                                                <Image
                                                    //  imageStyle={{ backgroundColor: 'red' }}
                                                    source={require('../../../assets/images/cowboy-sharper3.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        height: 100,
                                                        width: 0,
                                                        //   backgroundColor: 'red',
                                                        position: 'absolute',
                                                        right: 0,
                                                        bottom: getHeightOfPerson(true),
                                                    }}
                                                    height={160}
                                                    width={50}
                                                />
                                            ) : (
                                                <Image
                                                    //  imageStyle={{ backgroundColor: 'red' }}
                                                    source={require('../../../assets/images/cowboy-f-rev.png')}
                                                    resizeMode="contain"
                                                    style={{
                                                        height: 100,
                                                        width: 60,
                                                        //   backgroundColor: 'red',
                                                        position: 'absolute',
                                                        right: -8,
                                                        bottom: getHeightOfPerson(false),
                                                    }}
                                                    height={200}
                                                    width={70}
                                                />
                                            )}
                                        </View>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
                <View style={{ justifyContent: 'center', zIndex: 9999 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
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
                                            alignItems: 'flex-end',
                                            padding: 12,
                                            paddingRight: 0,
                                            zIndex: 999,
                                            borderRadius: borderRadius * 20,
                                        }}>
                                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                                    </View>
                                    {/* <View style={{ height: 30, width: 30, transform: [{ scaleX: -1 }] }}>
                                        <FingerPointing fill={currentTheme.colors.textDefault} />
                                    </View> */}
                                </View>
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: {} }}>
                                <MenuOption onSelect={() => onEditPossePress()}>
                                    <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 4 }}>
                                        <ThemedText.Text>Edit</ThemedText.Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => onDeletePossePress(item.posseId)}>
                                    <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 4 }}>
                                        <ThemedText.Text style={{ color: currentTheme.colors.error }}>
                                            Delete
                                        </ThemedText.Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
            </ThemedContainer>
        </Pressable>
    )
}

export default memo(PosseListItemV2)

const styles = StyleSheet.create({})
