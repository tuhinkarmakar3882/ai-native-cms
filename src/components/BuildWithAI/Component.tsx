'use client'
import React from 'react'
import styled from 'styled-components'
import { GenerateRichTextContent } from '@/components/BuildWithAI/GenerateRichTextContent'
import { GenerateTranslatedContent } from '@/components/BuildWithAI/GenerateTranslatedContent'
import { SuggestLayoutPlan } from '@/components/BuildWithAI/SuggestLayoutPlan'

const StyledBuildWithAIContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-block: 2rem;

  > * {
    flex: 1 1 160px;
  }

  button {
    display: block;
    height: 100%;
    margin: 0 !important;
  }
`

export const BuildWithAI = () => {
  return (
    <StyledBuildWithAIContainer>
      <GenerateRichTextContent />
      <GenerateTranslatedContent />
      <SuggestLayoutPlan />
    </StyledBuildWithAIContainer>
  )
}
