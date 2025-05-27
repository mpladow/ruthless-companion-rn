import { AnimatedFlatList, ThemedBottomSheet, ThemedText } from '@/components'
import StyledSafeAreaView from '@/components/StyledSafeAreaView'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { DUMMY_DATA } from '@/data/dummy_posse'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

const Home = () => {
    //  const posses = useSelector((state: RootState) => {
    //      return [DUMMY_DATA]
    //  })
    const posses = [DUMMY_DATA]
    const { currentTheme } = useTheme()
    const [openCreatePosse, setopenCreatePosse] = useState(false)
    return (
        <StyledSafeAreaView>
            <ThemedContainer style={{ marginVertical: margin }}>
                <View style={{ marginBottom: margin }}>
                    <ThemedText.Heading headingSize="h1">Heading</ThemedText.Heading>
                </View>
                <AnimatedFlatList
                    data={posses}
                    ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                    renderItem={({ item, index }) => (
                        <ThemedContainer
                            style={{
                                borderRadius: borderRadius,
                                borderWidth: borderWidth,
                                borderColor: currentTheme.colors.greyOutline,
                                flexDirection: 'row',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <ThemedText.Heading headingSize="h3">{item.name}</ThemedText.Heading>
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    flexDirection: 'row',
                                    borderRadius: borderRadius / 3,
                                    overflow: 'hidden',
                                    padding: padding,
                                    alignItems: 'center',
                                }}
                            >
                                {item.members.map((x, index) => {
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
                                            ]}
                                        >
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
                                                ]}
                                            >
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
                                })}
                            </View>
                        </ThemedContainer>
                    )}
                    keyExtractor={(item, index) => String(index)}
                />
            </ThemedContainer>
            <Pressable onPress={() => setopenCreatePosse(true)}>
                <ThemedText.Text>Open Modal</ThemedText.Text>
            </Pressable>
            <ThemedBottomSheet
                visible={openCreatePosse}
                onClose={() => {
                    setopenCreatePosse(false)
                }}
                allowCloseButton
                headerTitle={'Create New Posse'}
            >
                <View>
                    <ThemedText.Text>Hello</ThemedText.Text>
                </View>
            </ThemedBottomSheet>
        </StyledSafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
