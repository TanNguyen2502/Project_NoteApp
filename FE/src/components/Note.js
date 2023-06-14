import './ScrollbarStyle.css';
import React from 'react';
import { useState, useEffect } from 'react';
import CreateModal from './Modal/CreateModal';
import EditModal from './Modal/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import { loadNoteService } from '../Redux/Service';
import { deleteNoteRedux, deleteNoteSQL } from '../Redux/Slice/NoteSlice';
import { getCurrentNote, openCreateNoteModal, openEditNoteModal } from '../Redux/Slice/StatusSlice';
import { toast } from 'react-toastify';

const Note = () => {

  const dispatch = useDispatch();

  const listNoteRedux = useSelector(state => state.dataNote);
  const dataAccount = useSelector(state => state.dataUser);
  const alreadyData = useSelector(state => state.statusApp);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [listNoteSQL, setListNoteSQL] = useState('')

  useEffect( () => {
    const getDataNote = async() => {
      if(alreadyData.currentFolder && alreadyData.currentFolder.id){
        let res = await loadNoteService(alreadyData.currentFolder.id);
        if(res && res.errCode === 0){
          setListNoteSQL(res.data)
        }
      }
    }
    getDataNote();
  }, [alreadyData.currentFolder.id]);

  const handleCreateNote = () => {
    if(alreadyData.currentFolder === ''){
      toast.error("Chưa chọn thư mục để chứa ghi chú!");
    } else{
      setIsOpenCreateModal(true);
      dispatch(openCreateNoteModal());
    } 
  }

  const addCurrentNote = (note) => {
    let CreateCurrentNote = { id: Math.floor(Math.random() * 10000), nameNote: note.nameNote, folderId: note.folderId, contentText: '', contentHTML: '' }
    setListNoteSQL([...listNoteSQL, CreateCurrentNote])
  }

  const handleEditNote = () => {
      dispatch(openEditNoteModal());
      setIsOpenEditModal(true);
  }

  const editCurrentNote = (note) => {
    let currentListNote = listNoteSQL.map(item => {
      if (item.id === note.id) {
        return {...item, nameNote: note.name};
      }
      return item;
    });
    setListNoteSQL(currentListNote);
  }

  const handleDeleteNote = (note) => {
    if(dataAccount.userSQL && dataAccount.userSQL.id !== '' || 
        dataAccount.userSocial && dataAccount.userSocial.id !== ''){
      dispatch(deleteNoteSQL(note.id));
      let currentListNote = listNoteSQL;
      currentListNote = currentListNote.filter(item => item.id !== note.id);
      setListNoteSQL(currentListNote);
    } else{
      dispatch(deleteNoteRedux(note)); 
    }
  }

  const selectedNote = (note) => {
    dispatch(getCurrentNote(note))
  }

  return (
    <>
      <div className='folder-note-title'>
        <span> 
          Note: 
          { alreadyData.currentNote && alreadyData.currentNote.nameNote ? alreadyData.currentNote.nameNote : '' }
        </span>
        <span className='icon-create-folder-note'>
          <i className="fal fa-file-plus" onClick={handleCreateNote} />
        </span>
      </div>
      <div className='cursor-pointer scrollbar scrollbar1'>
        { dataAccount.statusLogin === true ? 
          listNoteSQL && listNoteSQL.length > 0 && 
          listNoteSQL.filter(item => item.folderId === alreadyData.currentFolder.id).map((note, index) => {
            return (
              <div key={`notes-${index}`}>
                <div className='item-folder-note'>
                  <div className="flex justify-between" onClick={ () => selectedNote(note) }>
                    { note.nameNote }
                    <div>
                      <i className="pr-2 far fa-edit" onClick={ () => handleEditNote(note) } /> 
                      <i className="far fa-trash-alt" onClick={ () => handleDeleteNote(note) } />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          :
          listNoteRedux && listNoteRedux.length > 0 &&
          listNoteRedux.filter(item => item.idFolder === alreadyData.currentFolder.Id_Folder).map((note, index) => {
            return (
              <div key={`notes-${index}`}>
                <div className='item-folder-note'>
                  <div className="flex justify-between" onClick={ () => selectedNote(note) }>
                    { note.nameNote }
                    <div>
                      <i className="pr-2 far fa-edit" onClick={ () => handleEditNote(note) } /> 
                      <i className="far fa-trash-alt" onClick={ () => handleDeleteNote(note) } />
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
                    addCurrentNote = { addCurrentNote } />
      <EditModal  isOpenEditModal = { isOpenEditModal }
                  setIsOpenEditModal = { setIsOpenEditModal } 
                  editCurrentNote = { editCurrentNote }/>
    </>
  )
}

export default Note