import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader} from '@vkontakte/vkui';

const Testik = ({ id, iframe }) => {
    console.log('Testik')
    return (<Panel id={id}>
    <PanelHeader>Testik</PanelHeader>
        <div dangerouslySetInnerHTML={ {__html:  iframe ? iframe : ""}} />
    </Panel>);
}

Testik.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Testik;