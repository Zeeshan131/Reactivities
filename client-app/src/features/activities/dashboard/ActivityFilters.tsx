import React, { Fragment } from 'react'
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

function ActivityFilters() {
    return (
        <Fragment>
            <Menu vertical size='large' style={{width: '100%', marginTop: 30}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All activities' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header  />
            <Calendar />
        </Fragment>
    )
}

export default ActivityFilters;