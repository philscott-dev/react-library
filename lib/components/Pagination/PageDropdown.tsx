import styled from '@emotion/styled'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownOption, IconButton, Text } from 'components'
import { useOnClickOutside } from 'hooks'
import PageArrows from './PageArrows'

export interface PageDropdownProps {
  className?: string
  page: number
  pageCount: number
  onClickPage: (nextPage: number) => void
}

const PageDropdown: FC<PageDropdownProps> = ({
  className,
  page,
  pageCount,
  onClickPage,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<number[]>([])
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  useEffect(() => {
    const arr = Array.from({ length: pageCount }, (_, i) => i + 1)
    setPages(arr)
  }, [pageCount])

  useOnClickOutside({
    ref: dropdownRef,
    ignoreRefs: [buttonRef],
    handler: () => setDropdownVisible(false),
    shouldListen: isDropdownVisible,
  })

  const handleButtonClick = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleClickPage = (e: MouseEvent<HTMLButtonElement>) => {
    setDropdownVisible(false)
    onClickPage(Number(e.currentTarget.value))
  }
  return (
    <div className={className}>
      <IconButton ref={buttonRef} onMouseDown={handleButtonClick}>
        <Text>{page}</Text>
        <PageArrows />
      </IconButton>
      <DropdownMenu ref={dropdownRef} isVisible={isDropdownVisible}>
        {pages.map((page) => (
          <DropdownOption key={page} value={page} onMouseDown={handleClickPage}>
            <Text>{page}</Text>
          </DropdownOption>
        ))}
      </DropdownMenu>
    </div>
  )
}

export default styled(PageDropdown)`
  position: relative;
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.color.indigo[300]};
    border-radius: 4px;
    padding: 2px 4px 2px 12px;
  }
  > div {
    display: flex;
    max-width: 285px;
    width: 285px;
    max-height: 285px;
    overflow-y: auto;
    flex-wrap: wrap;
    /* right: 0;
    bottom: 0; */
    > button {
      flex: 1;
      min-width: 65px;
    }
  }
`
