import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editFolderRedux, editFolderSQL } from '../../Redux/Slice/FolderSlice';
import { editNoteRedux, editNoteSQL } from '../../Redux/Slice/NoteSlice';

const EditModal = (props) => {

    const dispatch = useDispatch();

    const { isOpenEditModal, setIsOpenEditModal, editCurrentFolder, editCurrentNote } = props;

    const dataAccount = useSelector(state => state.dataUser);
    const alreadyData = useSelector(state => state.statusApp);

    const [newNameFolder, setNewNameFolder] = useState('')
    const [newNameNote, setNewNameNote] = useState('')
    const [checkLength, setCheckLength] = useState('')

    const EditFolder = () => {
        if(newNameFolder.length > 20){
            setCheckLength('Tên thư mục không được vượt quá 20 kí tự')
        }
        else if(newNameFolder.length === 0){
            setCheckLength('Tên thư mục hiện đang trống')
        }
        else{
            setIsOpenEditModal(false)
            if(dataAccount.userSQL && dataAccount.userSQL.id !== '' ||
                dataAccount.userSocial && dataAccount.userSocial.id !== '') {
                dispatch(editFolderSQL({
                    id: alreadyData.currentFolder.id,
                    folderName: newNameFolder
                }));
                editCurrentFolder({id: alreadyData.currentFolder.id, name: newNameFolder});
            } else{
                dispatch(editFolderRedux({
                    id: alreadyData.currentFolder.Id_Folder,
                    name: newNameFolder
                }));
            }
            setNewNameFolder('');
            setCheckLength('');
        }
    }

    const EditNote = () => {
        if(newNameNote.length > 20){
            setCheckLength('Tên ghi chú không được vượt quá 20 kí tự')
        }
        else if(newNameNote.length === 0){
            setCheckLength('Tên ghi chú hiện đang trống')
        }
        else{
            setIsOpenEditModal(false)
            if(dataAccount.userSQL && dataAccount.userSQL.id !== '' ||
                dataAccount.userSocial && dataAccount.userSocial.id !== '') {
                dispatch(editNoteSQL({
                    id: alreadyData.currentNote.id,
                    nameNote: newNameNote
                }));
                editCurrentNote({id: alreadyData.currentNote.id, name: newNameNote});
            } else{
                dispatch(editNoteRedux({
                    id: alreadyData.currentNote.Id_Note,
                    name: newNameNote,
                }));
            }
            setNewNameNote('');
            setCheckLength('');
        }
    }

    const closeModal = () => {
        setIsOpenEditModal(false);
        setNewNameFolder('');
        setNewNameNote('');
        setCheckLength('');
    }

    let OldNameFolder = `Tên thư mục hiện tại: ${ alreadyData.currentFolder.folderName ? alreadyData.currentFolder.folderName : '' }`;
    let OldNameNote   = `Tên ghi chú hiện tại: ${ alreadyData.currentNote.nameNote ? alreadyData.currentNote.nameNote : '' }`;

    return (
        <>
        { isOpenEditModal === true ? (
            <>
                <div className="frame-modal-1">
                    <div className="frame-crud-modal-2">
                        <div className="frame-crud-modal-3">
                            <label htmlFor="name" className="label-crud-modal"> 
                                { alreadyData.statusEditFolder === true ? 'Đổi tên thư mục' : 'Đổi tên ghi chú' }
                            </label> 
                            <div className="frame-input-crud-modal">
                                { alreadyData.statusEditFolder === true ?  
                                    <input  type="text" name="name" className="input-crud-modal" placeholder={ OldNameFolder }
                                            onChange={ (e) => setNewNameFolder(e.target.value) } />
                                    : 
                                    <input  type="text" name="name" className="input-crud-modal" placeholder={ OldNameNote }
                                            onChange={ (e) => setNewNameNote(e.target.value) } /> 
                                }
                            </div>
                            { checkLength && checkLength.length > 0 ? 
                                <>
                                    <i className="alert-icon-style fas fa-exclamation-triangle" />
                                    <span className='alert-contain'> { checkLength } </span>
                                </>
                                :
                                <></>
                            }
                            <div className="text-right">
                                <button className="button-crud-modal" onClick={ closeModal }> Hủy </button>
                                { alreadyData.statusEditFolder === true ?  
                                    <button type="submit" className="ml-1 button-crud-modal" onClick={ EditFolder }> Xác nhận </button>
                                    : 
                                    <button type="submit" className="ml-1 button-crud-modal" onClick={ EditNote }> Xác nhận </button>
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

export default EditModal;