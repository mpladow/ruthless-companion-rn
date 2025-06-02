import { ThemedText } from '@/components'
import FingerPointing from '@/components/Icons/FingerPointing'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { useResponsiveWidth } from '@/hooks'
import { Posse } from '@/models/posse'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Color from 'color'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

type PosseListItemV2Type = {
    item: Posse
    onListItemPress: (posseId: string) => void
    onDeletePossePress: (posseId: string) => void
    onAddMemberPress: (posseId: string) => void
    onEditPossePress: () => void
}
const PosseListItemV2 = ({
    item,
    onListItemPress,
    onDeletePossePress,
    onAddMemberPress,
    onEditPossePress,
}: PosseListItemV2Type) => {
    const { currentTheme, currentFontFamilies } = useTheme()
    const { viewport, isDesktop } = useResponsiveWidth()
    return (
        <Pressable onPress={() => onListItemPress(item.posseId)}>
            <ThemedContainer
                paddingSize="sm"
                style={[
                    {
                        borderRadius: 0,
                        borderWidth: borderWidth / 2,
                        overflow: 'hidden',
                        // borderColor: currentTheme.colors.greyOutline,
                        flexDirection: 'column',
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
                            flexDirection: 'row',

                            //  backgroundColor: Color(currentTheme.colors.secondary).lighten(0.5).hex(),
                            //  borderWidth: borderWidth / 2,
                        },
                    ]}>
                    <View style={{ height: 40, width: 40 }}>
                        <FingerPointing fill={currentTheme.colors.textDefault} />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: margin,
                            borderTopWidth: 2,
                            paddingTop: 4,
                            borderBottomWidth: 2,
                            borderBottomColor: currentTheme.colors.textDefault,
                        }}>
                        <ThemedText.Heading
                            headingSize="h1"
                            numberOfLines={2}
                            style={{
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontFamily: currentFontFamilies.find((x) => x.family == 'Smokum')?.regular.fontFamily,
                                color: currentTheme.colors.primary,
                            }}>
                            {item.name}
                        </ThemedText.Heading>
                    </View>
                    <View style={{ height: 40, width: 40, transform: [{ scaleX: -1 }] }}>
                        <FingerPointing fill={currentTheme.colors.textDefault} />
                    </View>
                </View>
                {/* <View>
                    <ThemedText.Heading headingSize="h2" style={{ textTransform: 'uppercase' }}>
                        {item?.members[0]?.name}
                    </ThemedText.Heading>
                    <ThemedText.Heading headingSize="h3">and notorious posse</ThemedText.Heading>
                </View> */}
                <View
                    style={{
                        flexDirection: 'row',
                        overflow: 'hidden',
                        padding: padding,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
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
                                    },
                                ]}>
                                <View style={[{ paddingHorizontal: margin }]}>
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
                                                //   backgroundColor: 'white',
                                                alignItems: 'center',
                                                justifyContent: 'center',
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
                                            <ThemedText.Text>
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
                                                    width: 50,
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
                                                        width: 60,
                                                        //   backgroundColor: 'red',
                                                        position: 'absolute',
                                                        right: 0,
                                                        bottom: -45,
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
                                                        bottom: -65,
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
                <View style={{ justifyContent: 'center', width: '100%', zIndex: 9999 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                        <Menu>
                            <MenuTrigger>
                                <View
                                    style={{
                                        paddingBottom: 0,
                                        borderTopWidth: 2,
                                        borderBottomWidth: 2,
                                        zIndex: 999,
                                    }}>
                                    <ThemedText.Heading headingSize="h3" style={{ textTransform: 'uppercase' }}>
                                        Menu
                                    </ThemedText.Heading>
                                </View>
                                {/* <Entypo
                                        name="dots-three-vertical"
                                        size={24}
                                        color={currentTheme.colors.textDefault}
                                    /> */}
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: {} }}>
                                <MenuOption onSelect={() => onEditPossePress()}>
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
                </View>
            </ThemedContainer>
        </Pressable>
    )
}

export default PosseListItemV2

const styles = StyleSheet.create({})
