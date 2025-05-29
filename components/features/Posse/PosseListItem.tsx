import { ThemedText } from '@/components'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { useResponsiveWidth } from '@/hooks'
import { Posse } from '@/models/posse'
import { borderRadius, borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

type PosseListItemType = {
    item: Posse
    onListItemPress: (posseId: string) => void
}
const PosseListItem = ({ item, onListItemPress }: PosseListItemType) => {
    const { currentTheme } = useTheme()
    const { viewport, isDesktop } = useResponsiveWidth()
    return (
        <Pressable onPress={() => onListItemPress(item.posseId)}>
            <ThemedContainer
                paddingSize="sm"
                style={{
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    borderColor: currentTheme.colors.greyOutline,
                    flexDirection: 'row',
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: padding }}>
                    <ThemedText.Heading headingSize="h3" numberOfLines={2}>
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
                    {item.members.map((x, index) => {
                        const itemMembersCount = item.members.length
                        if ((viewport) && index == 5) {
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
                                                borderColor: currentTheme.colors.secondary,
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
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Entypo name="dots-three-vertical" size={24} color="black" />
                </View>
            </ThemedContainer>
        </Pressable>
    )
}

export default PosseListItem

const styles = StyleSheet.create({})
