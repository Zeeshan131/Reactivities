import { Fragment, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';

function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activities, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activities.size <= 1) loadActivities();
    }, [activities.size, loadActivities]);

    return (
        <Grid>
            <Grid.Column width='10'>
                {activityStore.loadingInitial && !loadingNext ? (
                    <Fragment>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </Fragment>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);