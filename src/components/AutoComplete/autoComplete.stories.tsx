import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import AutoComplete,  { AutoCompleteProps, DataSourceType } from './autoComplete';

export default {
  title: 'Noah-Ark/AutoComplete',
  component: AutoComplete,
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_',
      },
    },
  },
} as Meta;

// const Template: Story<AutoCompleteProps> = (args) => <AutoComplete {...args} />;

interface optionProps {
  value: string;
  number: number;
}

export interface GitHubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const suggestionData = [
  {
    value: "mao",
    number: 1
  },
  {
    value: "deng",
    number: 2
  },
  {
    value: "xi",
    number: 3
  },
  {
    value: "wen",
    number: 4
  },
  {
    value: "jiang",
    number: 5
  },
  {
    value: "hu",
    number: 6
  },
  {
    value: "ye",
    number: 7
  },
  {
    value: "zhao",
    number: 8
  },
  {
    value: "wuhu",
    number: 9   
  }
]

// const handleFetch = (query: string) => {
//   return suggestionData.filter(item => item.includes(query))
// }

const handleFetch = (query: string) => {
  return suggestionData.filter(item => item.value.includes(query))
}

export const SimpleAutoComplete: Story<AutoCompleteProps>  = () => {
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  )
};
SimpleAutoComplete.storyName = "简单的 AutoComplete"

export const RenderOptAutoComplete: Story<AutoCompleteProps>  = () => {
  
  const renderOption = (item: DataSourceType) => {
    const itemWithNum = item as DataSourceType<optionProps>
    return (
      <>
        <h2>{itemWithNum.value}</h2>
        <p>Number: {itemWithNum.number}</p>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
      onSelect={action('selected')}
    />
  )
};
RenderOptAutoComplete.storyName = "自定义模版 AutoComplete"

export const handleAjaxFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      'Authorization': "token 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"
    }
  })
    .then(res => res.json())
    .then(({items}) => {
      console.log(items)
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    })
}

export const AjaxAutoComplete: Story<AutoCompleteProps>  = () => {
  const renderOption = (item: DataSourceType) => {
    const itemWithNum = item as DataSourceType<GitHubUserProps>
    return (
      <>
        <b>Name：{itemWithNum.login}  </b>
        <span>Url: {itemWithNum.url}</span>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleAjaxFetch}
      renderOption={renderOption}
      onSelect={action('selected')}
    />
  )
};
AjaxAutoComplete.storyName = "异步 AutoComplete"

