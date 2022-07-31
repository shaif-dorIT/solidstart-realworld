import { For } from 'solid-js'
import { createStore } from 'solid-js/store'

import type {
  Article,
  TextAreaEvent,
  TextInputEvent,
  TextInputKeyboardEvent
} from '~/types'
import { useStore } from '~/store'
import Form from '~/components/Form/Form'
import TextArea from '~/components/Form/TextArea'
import TextInput from '~/components/Form/TextInput'

type EditorState = {
  body: string
  title: string
  tagInput: string
  tagList: string[]
  description: string
  inProgress?: boolean
  errors?: string[]
}

export default () => {
  const [, { createArticle }] = useStore()
  const [state, setState] = createStore<EditorState>({
    body: '',
    title: '',
    tagInput: '',
    description: '',
    tagList: []
  })

  const updateState =
    (field: keyof EditorState) => (event: TextInputEvent | TextAreaEvent) =>
      setState(field, event.currentTarget.value)
  const handleAddTag = () => {
    if (state.tagInput) {
      setState({ tagList: [...state.tagList, state.tagInput], tagInput: '' })
    }
  }
  const handleRemoveTag = (tag: string) => {
    !state.inProgress &&
      setState('tagList', (tags) => tags.filter((t) => t !== tag))
  }

  const handleTagInputKeyDown = (ev: TextInputKeyboardEvent) => {
    switch (ev.code) {
      case 'enter': // Enter
      case 'tab': // Tab
      case ',': // ,
        handleAddTag()
        if (ev.code !== 'tab') ev.preventDefault()
        break
      default:
        break
    }
  }

  const getFields = () => {
    return {
      body: state.body,
      title: state.title,
      tagList: state.tagList,
      description: state.description
    }
  }

  const submitForm = async () => {
    setState({ inProgress: true })
    return createArticle(getFields() as Article)
  }

  const postSubmit = () => setState({ inProgress: false })

  return (
    <div class='editor-page'>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-10 offset-md-1 col-xs-12'>
            <Form
              submitFn={submitForm}
              postSubmitFn={postSubmit}
              redirect='/article'
              buttonText='Update Article'
            >
              <TextInput
                placeholder='Article Title'
                disabled={state.inProgress}
                value={state.title}
                onChange={updateState('title')}
              />
              <TextInput
                placeholder="What's this article about?"
                disabled={state.inProgress}
                value={state.description}
                onChange={updateState('description')}
              />
              <TextArea
                value={state.body}
                placeholder='Write your article (in markdown)'
                onChange={updateState('body')}
                disabled={state.inProgress}
              />
              <TextInput
                placeholder='Enter Tags'
                value={state.tagInput}
                disabled={state.inProgress}
                onChange={updateState('tagInput')}
                onBlur={handleAddTag}
                onKeyUp={handleTagInputKeyDown}
              >
                <div class='tag-list'>
                  <For each={state.tagList}>
                    {(tag) => (
                      <span class='tag-default tag-pill'>
                        <i
                          class='ion-close-round'
                          onClick={[handleRemoveTag, tag]}
                        />
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </TextInput>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
