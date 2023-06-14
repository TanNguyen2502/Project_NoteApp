import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFolderRedux, createFolderSQL } from '../../Redux/Slice/FolderSlice';
import { addNoteRedux, createNoteSQL } from '../../Redux/Slice/NoteSlice';

const CreateModal = (props) => {

    const dispatch = useDispatch();

    const { isOpenCreateModal, setIsOpenCreateModal, addCurrentFolder, addCurrentNote } = props;

    const dataAccount = useSelector(state => state.dataUser);
    const alreadyData = useSelector(state => state.statusApp);

    const [nameFolder, setNameFolder] = useState('')
    const [nameNote, setNameNote] = useState('')
    const [checkLength, setCheckLength] = useState('')

    const addNewFolder = () => {
        if(nameFolder.length > 20){
            setCheckLength('Tên thư mục không được vượt quá 20 kí tự')
        }
        else if(nameFolder.length === 0){
            setCheckLength('Tên thư mục hiện đang trống')}
        else{
            setIsOpenCreateModal(false);
            if(dataAccount.userSQL && dataAccount.userSQL.id !== '') {
                dispatch(createFolderSQL({
                    nameFolder, 
                    id: dataAccount.userSQL.id
                }));
                addCurrentFolder(nameFolder);
                window.location.reload(false);
            } 
            else if(dataAccount.userSocial && dataAccount.userSocial.id !== '') {
                dispatch(createFolderSQL({
                    nameFolder, 
                    id: dataAccount.userSocial.id
                }));
                addCurrentFolder(nameFolder);
                window.location.reload(false);
            } else{
                dispatch(addFolderRedux(nameFolder))
            }
            setNameFolder('');
            setCheckLength('');
        }
    }

    const addNewNote = () => {
        setIsOpenCreateModal(false);
        if(nameNote.length > 20){
            setCheckLength('Tên ghi chú không được vượt quá 20 kí tự')
        }
        else if(nameNote.length === 0){
            setCheckLength('Tên ghi chú hiện đang trống')
        } else{
            if(dataAccount.userSQL && dataAccount.userSQL.id !== '') {
                dispatch(createNoteSQL({
                    nameNote, 
                    folderId: alreadyData.currentFolder.id,
                    accountId: dataAccount.userSQL.id
                }));
                addCurrentNote({nameNote: nameNote, folderId:alreadyData.currentFolder.id});
                window.location.reload(false);
            } 
            else if(dataAccount.userSocial && dataAccount.userSocial.id !== '') {
                dispatch(createNoteSQL({
                    nameNote, 
                    folderId: alreadyData.currentFolder.id,
                    accountId: dataAccount.userSocial.id
                }));
                addCurrentNote({nameNote: nameNote, folderId:alreadyData.currentFolder.id});
                window.location.reload(false);
            } else{
                dispatch(addNoteRedux({ 
                    nameNote, 
                    idFolder: alreadyData.currentFolder.Id_Folder 
                }))
            }
            setNameNote('');
            setCheckLength('');
        }
    }

    const closeModal = () => {
        setIsOpenCreateModal(false);
        setNameFolder('');
        setNameNote('');
        setCheckLength('');
    }

    return (
        <>
            { isOpenCreateModal  === true ? (
                <>
                    <div className="frame-modal-1">
                        <div className="frame-crud-modal-2">
                            <div className="frame-crud-modal-3">
                                <div className="frame-crud-modal-4">
                                    <h2 className="title-crud-modal"> 
                                        { alreadyData.statusCreateFolder === true ? 'Tạo thư mục chứa mới' : 'Tạo ghi chú mới' }  
                                    </h2>
                                    <button type="button" className="button-close-crud-modal" onClick={closeModal}>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                                <label htmlFor="name" className="label-crud-modal">
                                    { alreadyData.statusCreateFolder === true ? 'Tên thư mục' : 'Tên ghi chú' }  
                                </label> 
                                <div className="frame-input-crud-modal">
                                    { alreadyData.statusCreateFolder === true ? 
                                        <input  type="text" name="name" className="input-crud-modal" placeholder="Nhập tên thư mục"
                                                onChange={ (e) => setNameFolder(e.target.value) } />
                                    : 
                                        <input  type="text" name="name" className="input-crud-modal" placeholder="Nhập tên ghi chú"
                                                onChange={ (e) => setNameNote(e.target.value) } />
                                    }
                                </div>
                                { checkLength && checkLength.length > 0 ? 
                                    <>
                                        <i className="alert-icon-style fas fa-exclamation-triangle" />
                                        <span className='alert-contain'> { checkLength } </span>
                                    </>
                                    :
                                    <> </>
                                }
                                <div className="text-right">
                                    <button className="button-crud-modal" onClick={ closeModal }> Hủy </button>
                                    { alreadyData.statusCreateFolder === true ? 
                                        <button type="submit" className="ml-1 button-crud-modal" onClick={ addNewFolder }> Xác nhận </button>
                                        : 
                                        <button type="submit" className="ml-1 button-crud-modal" onClick={ addNewNote }> Xác nhận </button>
                                    }
                                    
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className="background-crud-modal"></div>
                </>
            ) 
            : 
            null
            }
        </>
    )
}

export default CreateModal;