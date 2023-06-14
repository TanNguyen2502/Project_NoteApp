import './ScrollbarStyle.css';
import React from 'react';
import { useState, useEffect } from 'react';
import CreateModal from './Modal/CreateModal';
import EditModal from './Modal/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import { loadFolderService } from '../Redux/Service';
import { deleteFolderRedux, deleteFolderSQL } from '../Redux/Slice/FolderSlice';
import { getCurrentFolder, openCreateFolderModal, openEditFolderModal } from '../Redux/Slice/StatusSlice';

const Folder = () => {

  const dispatch = useDispatch();

  const listFolderRedux = useSelector(state => state.dataFolder);
  const dataAccount = useSelector(state => state.dataUser);
  const alreadyData = useSelector(state => state.statusApp);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [listFolderSQL, setListFolderSQL] = useState('')

  useEffect(() => {
    const getDataFolder = async() => {
      if(dataAccount.userSQL && dataAccount.userSQL.id){
        let res = await loadFolderService(dataAccount.userSQL.id);
        if(res && res.errCode === 0){
          setListFolderSQL(res.data)
        }
      }
      else if(dataAccount.userSocial && dataAccount.userSocial.id){
        let res = await loadFolderService(dataAccount.userSocial.id);
        if(res && res.errCode === 0){
          setListFolderSQL(res.data)
        }
      }
    }
    getDataFolder();
  }, []);

  const handleCreateFolder = () => {
    setIsOpenCreateModal(true);
    dispatch(openCreateFolderModal());
  }

  const addCurrentFolder = (folder) => {
    let CreateCurrentFolder = { id: Math.floor(Math.random() * 10000), folderName: folder }
    setListFolderSQL([...listFolderSQL, CreateCurrentFolder])
  }

  const handleEditFolder = () => {
    setIsOpenEditModal(true);
    dispatch(openEditFolderModal());
  }

  const editCurrentFolder = (folder) => {
    let currentList = listFolderSQL.map(item => {
      if (item.id === folder.id) {
        return {...item, folderName: folder.name};
      }
      return item;
    });
    setListFolderSQL(currentList);
  }

  const handleDeleteFolder = (folder) => {
    if(dataAccount.userSQL && dataAccount.userSQL.id !== '' || 
        dataAccount.userSocial && dataAccount.userSocial.id !== ''){
      dispatch(deleteFolderSQL(folder.id));
      let currentListFolder = listFolderSQL;
      currentListFolder = currentListFolder.filter(item => item.id !== folder.id);
      setListFolderSQL(currentListFolder);
    } else{
      dispatch(deleteFolderRedux(folder)); 
    }
  }

  const selectedFolder = (folder) => {
    dispatch(getCurrentFolder(folder))
  }

  return (
    <>
      <div className='folder-note-title'>
        <span> 
          Folder: 
          { alreadyData.currentFolder && alreadyData.currentFolder.folderName ? alreadyData.currentFolder.folderName : '' } 
        </span>
        <span className='icon-create-folder-note'>
          <i className="fal fa-folder-plus" onClick={handleCreateFolder} />
        </span>
      </div>
      <div className='cursor-pointer scrollbar scrollbar1'>
        { dataAccount.statusLogin === true ? 
          listFolderSQL && listFolderSQL.length > 0 && listFolderSQL.map((folder, index) => {
            return (
              <div key={`folders-${index}`}>
                  <div className='item-folder-note'>
                    <div className="flex justify-between" onClick={ () => selectedFolder(folder) }>
                      { folder.folderName }
                      <div>
                        <i  className="pr-2 far fa-edit" onClick={ handleEditFolder } /> 
                        <i  className="far fa-trash-alt" onClick={ () => handleDeleteFolder(folder) } />
                      </div>
                    </div>
                  </div>
              </div>
            )
          })
          : 
          listFolderRedux && listFolderRedux.length > 0 && listFolderRedux.map((folder, index) => {
            return (
              <div key={`folders-${index}`}>
                <div className='item-folder-note'>
                  <div className="flex justify-between" onClick={() => selectedFolder(folder)}>
                    { folder.folderName }
                    <div>
                      <i  className="pr-2 far fa-edit" onClick={ () => handleEditFolder(folder) } /> 
                      <i  className="far fa-trash-alt" onClick={ () => handleDeleteFolder(folder) } />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <CreateModal  isOpenCreateModal = { isOpenCreateModal }
                    setIsOpenCreateModal = { setIsOpenCreateModal }
                    setListFolderSQL = { setListFolderSQL }
                    addCurrentFolder = { addCurrentFolder } />
      <EditModal  isOpenEditModal = { isOpenEditModal }
                  setIsOpenEditModal = { setIsOpenEditModal } 
                  setListFolderSQL = { setListFolderSQL }
                  editCurrentFolder = { editCurrentFolder } />
    </>
  )
}

export default Folder