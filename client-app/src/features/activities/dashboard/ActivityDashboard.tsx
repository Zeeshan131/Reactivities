import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activities} = activityStore;

    useEffect(() => {
        if (activities.size <= 1) loadActivities();
    }, [activities.size, loadActivities]);

    if (activityStore.loadingInitial) {
        return <LoadingComponents content='Loading activities...' />
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);