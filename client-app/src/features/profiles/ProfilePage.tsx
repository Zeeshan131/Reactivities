import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore: { loadingProfile, loadProfile, profile, setActiveTab } } = useStore();

    useEffect(() => {
        loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return <LoadingComponents content='Loading Profile ...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <Fragment>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </Fragment>}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage);