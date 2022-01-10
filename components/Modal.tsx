import React, { useContext } from 'react';
// Context
import { GlobalContext } from '../context/GlobalContext';
// Components
import CategoryManagement from './CategoryManagement';
// Styles
import classes from '../styles/components/Modal.module.css'
// Types
import { CategoryType, MetadataType, ModalActions } from '../types/Types';

type Props = {
    category?: CategoryType
    setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>
    setSelectedMetadata: React.Dispatch<React.SetStateAction<MetadataType | undefined>>
}

export default function Modal({ category, setSelectedCategory, setSelectedMetadata }: Props) {
    const { modalInfo } = useContext(GlobalContext);

    let component;
    switch (modalInfo.action) {
        case ModalActions.ADD_CATEGORY: case ModalActions.EDIT_CATEGORY: case ModalActions.DELETE_CATEGORY:
            component = <CategoryManagement category={category} setSelectedCategory={setSelectedCategory}/>
            break;
        case ModalActions.EDIT_METADATA: 
            // component = <MetadataManagement metadata={metadata}/>
            component = null;
            break
        default: component = null;
    }

    return (
        <div className={classes.container} style={{ display: modalInfo.open ? 'flex' : 'none' }}>
            <div className={classes.modal}>
                {component}
            </div>
        </div>
    )
};