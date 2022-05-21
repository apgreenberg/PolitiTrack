import React from 'react';
import { View, Text, Switch, SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { selectCurrentUser, useAppSelector } from '../../redux/hooks';

import { toggleSetting } from '../../model/database/handleSettings';
import { UserInfo } from '../../model/database/userInterfaces';

import CustomButton from '../components/CustomButton';

import text from '../styles/text';
import colors from '../styles/colors';

/**
 * Allows the user to track updates to their saves jurisdictions/bills
 * This page's functionality is a week 4 objective
 * @returns - the functional components which represent the screen
 */
const SettingsScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const [jurisdictionSetting, setJurisdictionSetting] = React.useState(
    currentUser.settings.updateJurisdictions
  );
  const [billSetting, setBillSetting] = React.useState(
    currentUser.settings.updateBills
  );

  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View
          style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 3 }}
        >
          <Text style={[text.largeText, { textAlign: 'left' }]}>
            Notifications
          </Text>
        </View>
        <View style={styles.settingsRow}>
          <View style={{ width: '85%', left: 15, paddingRight: 10 }}>
            <Text style={[text.mediumText, { textAlign: 'left' }]}>
              Notify me when one of my saved jurisdictions becomes active
            </Text>
          </View>
          <View style={{ right: 0 }}>
            <Switch
              testID={'jurisdictionSetting'}
              trackColor={{
                true: colors.highlightedSecondaryColor,
                false: colors.secondaryColor,
              }}
              thumbColor={jurisdictionSetting ? 'white' : colors.primaryColor}
              ios_backgroundColor={colors.secondaryColor}
              onValueChange={() =>
                toggleSetting(
                  currentUser,
                  'updateJurisdictions',
                  setJurisdictionSetting
                )
              }
              value={jurisdictionSetting}
            />
          </View>
        </View>
        <View style={styles.settingsRow}>
          <View style={{ width: '85%', left: 15, paddingRight: 10 }}>
            <Text style={[text.mediumText, { textAlign: 'left' }]}>
              Notify me when one of my saved bills is updated
            </Text>
          </View>
          <View style={{ right: 0 }}>
            <Switch
              testID={'billSetting'}
              trackColor={{
                true: colors.highlightedSecondaryColor,
                false: colors.secondaryColor,
              }}
              thumbColor={billSetting ? 'white' : colors.primaryColor}
              ios_backgroundColor={colors.secondaryColor}
              onValueChange={() =>
                toggleSetting(currentUser, 'updateBills', setBillSetting)
              }
              value={billSetting}
            />
          </View>
        </View>
        <View style={{ paddingTop: 20, height: '40%' }}>
          <CustomButton type="Update Account Information" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsRow: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryColor,
  },
});
export default SettingsScreen;
