import { useState, useEffect } from "react";
import './ScrollbarStyle.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector, useDispatch } from 'react-redux';
import { editContentNoteRedux, editNoteSQL } from '../Redux/Slice/NoteSlice';
import { toast } from 'react-toastify';

const InputZone = () => {

  const dispatch = useDispatch();

  const alreadyData = useSelector(state => state.statusApp);

  const [editorState, setEditorState] = useState('');
  const [text, setText] = useState('');
  const [textHTML, setTextHTML] = useState();

  useEffect(() => {
    const getContentHTMLSQL = () => {
      if(alreadyData.currentNote && alreadyData.currentNote.id){
          const getContentHTML = alreadyData.currentNote.contentHTML;
          const contentBlock = htmlToDraft(getContentHTML);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
      }
    }
    getContentHTMLSQL();
  }, [alreadyData.currentNote.id]);

  useEffect(() => {
    const getContentHTMLRedux = () => {
      if(alreadyData.currentNote && alreadyData.currentNote.Id_Note){
        const getContentHTML = alreadyData.currentNote.contentHTML;
        const contentBlock = htmlToDraft(getContentHTML);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      } 
    }
    getContentHTMLRedux();
  }, [alreadyData.currentNote.Id_Note]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(alreadyData.currentNote && alreadyData.currentNote.id && text){
        toast.success("Lưu thành công!");
        dispatch(editNoteSQL({
          id: alreadyData.currentNote.id,
          folderId: alreadyData.currentNote.folderId,
          contentHTML: textHTML, 
          contentText: text
        }));
        window.location.reload(false);
      } 
      else if(alreadyData.currentNote && alreadyData.currentNote.Id_Note && text){
        toast.success("Lưu thành công!");
        dispatch(editContentNoteRedux({
          id: alreadyData.currentNote.Id_Note,
          contentHTML: textHTML,
          contentText: text
        }));
      }
    }, 4000)
    return () => clearTimeout(delayDebounceFn)
  }, [text]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    setText(text);
    let textHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setTextHTML(textHTML);
  };

  return (
    <>
      <div className="px-2 scrollbars scrollbar1">
        <div className="text-green-500"> ** Ghi chú tự lưu lại sau 4 giây, xin hãy chờ lưu! ** </div>
        <Editor editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                onEditorStateChange={onEditorStateChange} 
                mention={{  separator: " ",
                            trigger: "@",
                            suggestions: [
                              { text: "APPLE", value: "apple" },
                              { text: "BANANA", value: "banana", url: "banana" },
                              { text: "CHERRY", value: "cherry", url: "cherry" },
                              { text: "DURIAN", value: "durian", url: "durian" },
                              { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                              { text: "FIG", value: "fig", url: "fig" },
                              { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
                              { text: "HONEYDEW", value: "honeydew", url: "honeydew" } ]}} />
      </div>
    </>
  );
}

export default InputZone;