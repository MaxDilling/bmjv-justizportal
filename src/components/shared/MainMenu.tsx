import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import React from 'react';
import { FaGlobeAfrica } from 'react-icons/fa';
import { Link as ReactLink, NavLink } from 'react-router-dom';
import { C_DarkGray, homeURL, Primary, Routes } from '../../Const';
import { ColorModeSwitcher } from '../../logic/ColorModeSwitcher';
import theme from '../../theme';
import { dynamicActivate, gerUserLocale, locales } from '../../translations/i18n';

interface FeatureProps extends BoxProps {}

export const LanguageSelector = (props: FeatureProps) => {
  const popoverContentBgColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box alignSelf="center" {...props}>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <Button aria-label="" paddingInline="0.5rem" fontSize="lg" variant="ghost" leftIcon={<FaGlobeAfrica />}>
            {' '}
            {gerUserLocale().toUpperCase()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          border={0}
          boxShadow={'xl'}
          // bg={popoverContentBgColor}
          rounded={'xl'}
          width={'100%'}
          minW={10}>
          <Stack>
            {Object.keys(locales).map((key) => (
              <Box
                key={key}
                role={'group'}
                display={'block'}
                _hover={{ background: popoverContentBgColor }}
                p={2}
                px={5}
                rounded={'xl'}
                onClick={() => {
                  dynamicActivate(key);
                }}>
                <Text transition={'all .3s ease'} fontSize={'2xl'}>
                  {locales[key][1]}
                </Text>
              </Box>
            ))}
          </Stack>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export const MenuWithSubnavigation = (props: FeatureProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const color = getColor(theme, Primary());

  return (
    <Box position={{ md: 'sticky' }} top={0} width="100%" zIndex="100" {...props}>
      <Flex
        bg={useColorModeValue('gray.50', 'gray.600')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 2 }} justify={{ base: 'center', md: 'start' }}>
          <Link as={ReactLink} to={`${homeURL}/`}>
            <svg width="208" height="31" viewBox="0 0 139 21" fill={color} xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.51965 11.141C6.61711 12.0824 7.06079 12.9543 7.76492 13.5882C8.46906 14.2222 9.38366 14.573 10.3319 14.573C11.2802 14.573 12.1948 14.2222 12.8989 13.5882C13.6031 12.9543 14.0467 12.0824 14.1442 11.141C14.1571 11.0123 14.1635 10.8819 14.1635 10.7498C14.1678 10.2449 14.0719 9.74404 13.8813 9.27628C13.6907 8.80851 13.4091 8.38306 13.0529 8.02446C12.6967 7.66587 12.2728 7.38124 11.8058 7.187C11.3388 6.99276 10.8379 6.89275 10.3319 6.89275C9.82598 6.89275 9.32504 6.99276 8.85802 7.187C8.391 7.38124 7.96715 7.66587 7.61093 8.02446C7.2547 8.38306 6.97316 8.80851 6.78254 9.27628C6.59192 9.74404 6.49601 10.2449 6.50033 10.7498C6.50033 10.8814 6.50677 11.0122 6.51965 11.141ZM3.79441e-09 10.6878C-5.53598e-05 8.64813 0.605893 6.65426 1.74122 4.95833C2.87654 3.2624 4.49024 1.94058 6.37826 1.16002C8.26628 0.379469 10.3438 0.175239 12.3481 0.573163C14.3524 0.971087 16.1935 1.95329 17.6385 3.39556C19.0835 4.83784 20.0676 6.6754 20.4662 8.67587C20.8648 10.6763 20.6602 12.7499 19.878 14.6342C19.0959 16.5186 17.7715 18.1292 16.0723 19.2623C14.3731 20.3954 12.3754 21.0001 10.3318 21C8.97497 21 7.63144 20.7333 6.37791 20.215C5.12439 19.6968 3.98541 18.9372 3.02601 17.9796C2.06661 17.022 1.30558 15.8852 0.78638 14.6341C0.267175 13.3829 -3.67582e-05 12.042 3.79441e-09 10.6878Z"
              />
              <path
                d="M30.2707 4.728C30.2707 5.08 30.1587 5.36267 29.9347 5.576C29.7107 5.77867 29.428 5.88 29.0867 5.88C28.7454 5.88 28.4627 5.77867 28.2387 5.576C28.0147 5.36267 27.9027 5.08 27.9027 4.728C27.9027 4.36533 28.0147 4.08267 28.2387 3.88C28.4627 3.66667 28.7454 3.56 29.0867 3.56C29.428 3.56 29.7107 3.66667 29.9347 3.88C30.1587 4.08267 30.2707 4.36533 30.2707 4.728ZM30.0947 14.68C30.0947 15.9387 29.7854 16.8667 29.1667 17.464C28.5587 18.072 27.6307 18.3813 26.3827 18.392L26.2547 16.712C26.5747 16.6907 26.8467 16.6427 27.0707 16.568C27.3054 16.4933 27.4974 16.3707 27.6467 16.2C27.796 16.04 27.9027 15.8267 27.9667 15.56C28.0414 15.304 28.0787 14.9733 28.0787 14.568V7.208H30.0947V14.68ZM38.7012 15H36.8612V14.12H36.8292C36.7545 14.216 36.6585 14.328 36.5412 14.456C36.4239 14.5733 36.2745 14.6907 36.0932 14.808C35.9225 14.9147 35.7145 15.0053 35.4692 15.08C35.2239 15.1547 34.9359 15.192 34.6052 15.192C33.7732 15.192 33.1439 14.9307 32.7172 14.408C32.2905 13.8853 32.0772 13.1333 32.0772 12.152V7.208H34.0932V11.8C34.0932 12.3973 34.1839 12.824 34.3652 13.08C34.5572 13.336 34.8719 13.464 35.3092 13.464C35.6399 13.464 35.9119 13.4107 36.1252 13.304C36.3492 13.1973 36.5359 13.0747 36.6852 12.936V7.208H38.7012V15ZM44.8946 9.192C44.8412 9.14933 44.7612 9.096 44.6546 9.032C44.5586 8.968 44.4412 8.904 44.3026 8.84C44.1746 8.776 44.0199 8.72267 43.8386 8.68C43.6679 8.63733 43.4812 8.616 43.2786 8.616C42.9372 8.616 42.6759 8.66933 42.4946 8.776C42.3239 8.88267 42.2386 9.01067 42.2386 9.16C42.2386 9.36267 42.3132 9.528 42.4626 9.656C42.6226 9.77333 42.8839 9.92267 43.2466 10.104L43.7106 10.328C44.0092 10.4773 44.2759 10.632 44.5106 10.792C44.7559 10.9413 44.9639 11.1173 45.1346 11.32C45.3052 11.512 45.4386 11.7307 45.5346 11.976C45.6306 12.2107 45.6786 12.488 45.6786 12.808C45.6786 13.5333 45.4279 14.1147 44.9266 14.552C44.4359 14.9787 43.7052 15.192 42.7346 15.192C42.3826 15.192 42.0732 15.16 41.8066 15.096C41.5399 15.0427 41.3052 14.9787 41.1026 14.904C40.8999 14.8187 40.7292 14.728 40.5906 14.632C40.4519 14.536 40.3346 14.4453 40.2386 14.36L40.8626 12.728C40.9372 12.8027 41.0332 12.888 41.1506 12.984C41.2679 13.08 41.4012 13.1707 41.5506 13.256C41.7106 13.3307 41.8812 13.4 42.0626 13.464C42.2546 13.5173 42.4572 13.544 42.6706 13.544C43.0119 13.544 43.2839 13.496 43.4866 13.4C43.6999 13.2933 43.8066 13.1493 43.8066 12.968C43.8066 12.8507 43.7852 12.7493 43.7426 12.664C43.6999 12.5787 43.6306 12.4987 43.5346 12.424C43.4492 12.3493 43.3319 12.2747 43.1826 12.2C43.0439 12.1253 42.8732 12.0347 42.6706 11.928L42.2066 11.688C41.6626 11.4213 41.2306 11.1067 40.9106 10.744C40.6012 10.3707 40.4466 9.87467 40.4466 9.256C40.4466 8.91467 40.5159 8.60533 40.6546 8.328C40.7932 8.05067 40.9852 7.816 41.2306 7.624C41.4866 7.432 41.7799 7.28267 42.1106 7.176C42.4519 7.06933 42.8252 7.016 43.2306 7.016C43.5506 7.016 43.8332 7.04267 44.0786 7.096C44.3239 7.14933 44.5319 7.21333 44.7026 7.288C44.8839 7.36267 45.0332 7.44267 45.1506 7.528C45.2679 7.60267 45.3586 7.66667 45.4226 7.72L44.8946 9.192ZM51.4586 8.808H49.6666V11.96C49.6666 12.536 49.7466 12.9307 49.9066 13.144C50.0666 13.3573 50.3332 13.464 50.7066 13.464C50.8879 13.464 51.0532 13.448 51.2026 13.416C51.3519 13.3733 51.4586 13.3413 51.5226 13.32L51.6666 14.808C51.5812 14.8507 51.4212 14.92 51.1866 15.016C50.9626 15.112 50.6266 15.16 50.1786 15.16C49.7412 15.16 49.3626 15.1067 49.0426 15C48.7332 14.8933 48.4719 14.7227 48.2586 14.488C48.0559 14.2427 47.9012 13.9333 47.7946 13.56C47.6986 13.176 47.6506 12.7067 47.6506 12.152V8.808H46.5946V7.432L47.6506 7.24L47.8746 5.064H49.6666V7.208H51.6346L51.4586 8.808ZM55.0947 15H53.0787V7.208H55.0947V15ZM55.2547 4.728C55.2547 5.08 55.1427 5.36267 54.9187 5.576C54.7054 5.77867 54.428 5.88 54.0867 5.88C53.7347 5.88 53.4467 5.77867 53.2227 5.576C53.0094 5.36267 52.9027 5.08 52.9027 4.728C52.9027 4.36533 53.0094 4.08267 53.2227 3.88C53.4467 3.66667 53.7347 3.56 54.0867 3.56C54.428 3.56 54.7054 3.66667 54.9187 3.88C55.1427 4.08267 55.2547 4.36533 55.2547 4.728ZM62.4372 8.392L59.3332 13.368V13.4H62.6932L62.5172 15H56.6772V13.816L59.9092 8.84V8.808H56.8852V7.208H62.4372V8.392ZM71.1949 10.92C71.1949 11.624 71.1096 12.2427 70.9389 12.776C70.7683 13.3093 70.5229 13.752 70.2029 14.104C69.8936 14.456 69.5149 14.7227 69.0669 14.904C68.6296 15.0853 68.1389 15.176 67.5949 15.176C67.2856 15.176 67.0189 15.144 66.7949 15.08C66.5816 15.0267 66.4003 14.9573 66.2509 14.872V18.2H64.2349V7.208H66.0909V8.072H66.1229C66.1869 7.976 66.2776 7.86933 66.3949 7.752C66.5123 7.63467 66.6616 7.52267 66.8429 7.416C67.0243 7.29867 67.2323 7.20267 67.4669 7.128C67.7123 7.05333 67.9896 7.016 68.2989 7.016C68.7256 7.016 69.1149 7.096 69.4669 7.256C69.8296 7.416 70.1389 7.656 70.3949 7.976C70.6509 8.296 70.8483 8.70133 70.9869 9.192C71.1256 9.68267 71.1949 10.2587 71.1949 10.92ZM67.5469 8.744C67.2483 8.744 66.9923 8.792 66.7789 8.888C66.5656 8.97333 66.3896 9.07467 66.2509 9.192V13.304C66.3683 13.3787 66.5069 13.4427 66.6669 13.496C66.8269 13.5387 67.0136 13.56 67.2269 13.56C67.8349 13.56 68.3043 13.3627 68.6349 12.968C68.9656 12.5733 69.1309 11.9227 69.1309 11.016C69.1309 10.1947 68.9869 9.61333 68.6989 9.272C68.4109 8.92 68.0269 8.744 67.5469 8.744ZM79.6436 11.096C79.6436 11.7893 79.5422 12.392 79.3396 12.904C79.1369 13.416 78.8649 13.8427 78.5236 14.184C78.1929 14.5147 77.8089 14.7653 77.3716 14.936C76.9342 15.1067 76.4809 15.192 76.0116 15.192C75.5209 15.192 75.0622 15.112 74.6356 14.952C74.2089 14.792 73.8356 14.5467 73.5156 14.216C73.1956 13.8747 72.9449 13.448 72.7636 12.936C72.5822 12.4133 72.4916 11.8 72.4916 11.096C72.4916 10.4133 72.5929 9.816 72.7956 9.304C72.9982 8.792 73.2649 8.36533 73.5956 8.024C73.9369 7.68267 74.3262 7.432 74.7636 7.272C75.2009 7.10133 75.6542 7.016 76.1236 7.016C76.6142 7.016 77.0729 7.096 77.4996 7.256C77.9369 7.416 78.3102 7.66133 78.6196 7.992C78.9396 8.32267 79.1902 8.74933 79.3716 9.272C79.5529 9.784 79.6436 10.392 79.6436 11.096ZM77.5796 11.096C77.5796 10.6693 77.5369 10.3067 77.4516 10.008C77.3769 9.69867 77.2702 9.45333 77.1316 9.272C76.9929 9.09067 76.8329 8.95733 76.6516 8.872C76.4702 8.78667 76.2782 8.744 76.0756 8.744C75.6596 8.744 75.3022 8.92533 75.0036 9.288C74.7049 9.65067 74.5556 10.2533 74.5556 11.096C74.5556 11.96 74.7049 12.5733 75.0036 12.936C75.3022 13.288 75.6596 13.464 76.0756 13.464C76.2782 13.464 76.4702 13.4213 76.6516 13.336C76.8436 13.2507 77.0036 13.112 77.1316 12.92C77.2702 12.728 77.3769 12.4827 77.4516 12.184C77.5369 11.8853 77.5796 11.5227 77.5796 11.096ZM85.6331 8.888C85.6011 8.86667 85.5317 8.84533 85.4251 8.824C85.3291 8.80267 85.2011 8.792 85.0411 8.792C84.5931 8.792 84.2304 8.872 83.9531 9.032C83.6757 9.192 83.4677 9.37867 83.3291 9.592V15H81.3131V7.208H83.1691V8.296H83.2011C83.3824 7.944 83.6171 7.65067 83.9051 7.416C84.2037 7.18133 84.6144 7.064 85.1371 7.064C85.2864 7.064 85.4144 7.07467 85.5211 7.096C85.6384 7.10667 85.7237 7.11733 85.7771 7.128L85.6331 8.888ZM91.2554 8.808H89.4634V11.96C89.4634 12.536 89.5434 12.9307 89.7034 13.144C89.8634 13.3573 90.1301 13.464 90.5034 13.464C90.6848 13.464 90.8501 13.448 90.9994 13.416C91.1488 13.3733 91.2554 13.3413 91.3194 13.32L91.4634 14.808C91.3781 14.8507 91.2181 14.92 90.9834 15.016C90.7594 15.112 90.4234 15.16 89.9754 15.16C89.5381 15.16 89.1594 15.1067 88.8394 15C88.5301 14.8933 88.2688 14.7227 88.0554 14.488C87.8528 14.2427 87.6981 13.9333 87.5914 13.56C87.4954 13.176 87.4474 12.7067 87.4474 12.152V8.808H86.3914V7.432L87.4474 7.24L87.6714 5.064H89.4634V7.208H91.4314L91.2554 8.808ZM92.4436 12.856C92.4436 12.4507 92.5342 12.0987 92.7156 11.8C92.9076 11.5013 93.1636 11.256 93.4836 11.064C93.8036 10.872 94.1769 10.728 94.6036 10.632C95.0409 10.536 95.5102 10.488 96.0116 10.488H96.3316V10.216C96.3316 9.20267 95.8942 8.696 95.0196 8.696C94.7742 8.696 94.5556 8.72267 94.3636 8.776C94.1716 8.82933 93.9956 8.89867 93.8356 8.984C93.6862 9.05867 93.5529 9.13867 93.4356 9.224C93.3289 9.30933 93.2436 9.384 93.1796 9.448L92.5556 8.168C92.6516 8.072 92.7796 7.96 92.9396 7.832C93.0996 7.69333 93.2969 7.56533 93.5316 7.448C93.7662 7.33067 94.0382 7.22933 94.3476 7.144C94.6676 7.05867 95.0302 7.016 95.4356 7.016C96.3529 7.016 97.0569 7.27733 97.5476 7.8C98.0382 8.32267 98.2836 9.14933 98.2836 10.28V12.904C98.2836 13.352 98.2942 13.752 98.3156 14.104C98.3476 14.456 98.3796 14.7547 98.4116 15H96.5556C96.5449 14.8827 96.5342 14.7493 96.5236 14.6C96.5129 14.44 96.5076 14.2853 96.5076 14.136H96.4756C96.4116 14.2533 96.3262 14.376 96.2196 14.504C96.1236 14.632 96.0009 14.7493 95.8516 14.856C95.7129 14.952 95.5422 15.032 95.3396 15.096C95.1369 15.16 94.8969 15.192 94.6196 15.192C93.9796 15.192 93.4569 14.9787 93.0516 14.552C92.6462 14.1253 92.4436 13.56 92.4436 12.856ZM95.1956 13.624C95.4836 13.624 95.7129 13.576 95.8836 13.48C96.0649 13.3733 96.2142 13.2613 96.3316 13.144V11.704L95.9316 11.72C95.4089 11.752 95.0142 11.8427 94.7476 11.992C94.4809 12.1307 94.3476 12.3547 94.3476 12.664C94.3476 12.9413 94.4276 13.1707 94.5876 13.352C94.7476 13.5333 94.9502 13.624 95.1956 13.624ZM102.266 12.488C102.266 12.904 102.319 13.1867 102.426 13.336C102.532 13.4747 102.708 13.544 102.954 13.544C103.092 13.544 103.21 13.5333 103.306 13.512C103.412 13.48 103.492 13.4533 103.546 13.432L103.674 14.84C103.588 14.8933 103.434 14.9573 103.21 15.032C102.986 15.1067 102.692 15.144 102.33 15.144C102.01 15.144 101.716 15.1013 101.45 15.016C101.194 14.9413 100.975 14.8133 100.794 14.632C100.623 14.44 100.49 14.1947 100.394 13.896C100.298 13.5867 100.25 13.2133 100.25 12.776V3.72L102.266 3.544V12.488ZM106.971 13.976C106.971 14.3493 106.859 14.648 106.635 14.872C106.421 15.0853 106.128 15.192 105.755 15.192C105.392 15.192 105.099 15.0853 104.875 14.872C104.661 14.648 104.555 14.3493 104.555 13.976C104.555 13.6027 104.661 13.304 104.875 13.08C105.099 12.856 105.392 12.744 105.755 12.744C106.128 12.744 106.421 12.856 106.635 13.08C106.859 13.304 106.971 13.6027 106.971 13.976ZM108.304 11.128C108.304 10.4453 108.4 9.848 108.592 9.336C108.795 8.824 109.062 8.39733 109.392 8.056C109.723 
              7.71467 110.102 7.45867 110.528 7.288C110.966 7.10667 111.419 7.016 111.888 7.016C112.208 7.016 112.475 7.05333 112.688 7.128C112.912 7.192 113.099 7.26667 113.248 7.352V3.72L115.264 3.544V15H113.424V14.12H113.392C113.35 14.1947 113.28 14.2907 113.184 14.408C113.088 14.5253 112.955 14.6427 112.784 14.76C112.624 14.8773 112.422 14.9787 112.176 15.064C111.931 15.1493 111.632 15.192 111.28 15.192C110.843 15.192 110.438 15.1067 110.064 14.936C109.702 14.7653 109.387 14.5147 109.12 14.184C108.864 13.8427 108.662 13.416 108.512 12.904C108.374 12.392 108.304 11.8 108.304 11.128ZM111.872 13.464C112.214 13.464 112.491 13.4107 112.704 13.304C112.928 13.1867 113.11 13.064 113.248 12.936V8.936C113.131 8.85067 112.987 8.78133 112.816 8.728C112.646 8.67467 112.438 8.648 112.192 8.648C111.648 8.648 111.206 8.84533 110.864 9.24C110.534 9.624 110.368 10.2213 110.368 11.032C110.368 11.4693 110.406 11.8427 110.48 12.152C110.555 12.4613 110.656 12.712 110.784 12.904C110.923 13.096 111.083 13.24 111.264 13.336C111.456 13.4213 111.659 13.464 111.872 13.464ZM123.201 10.136C123.201 10.488 123.185 10.7867 123.153 11.032C123.132 11.2667 123.105 11.4747 123.073 11.656H118.897C118.95 12.3173 119.153 12.792 119.505 13.08C119.868 13.3573 120.369 13.496 121.009 13.496C121.265 13.496 121.494 13.4747 121.697 13.432C121.9 13.3787 122.076 13.32 122.225 13.256C122.385 13.1813 122.518 13.112 122.625 13.048C122.732 12.9733 122.812 12.9147 122.865 12.872L123.329 14.28C123.265 14.3333 123.174 14.4133 123.057 14.52C122.94 14.616 122.769 14.7173 122.545 14.824C122.332 14.92 122.06 15.0053 121.729 15.08C121.409 15.1547 121.02 15.192 120.561 15.192C120.028 15.192 119.537 15.1173 119.089 14.968C118.652 14.808 118.273 14.5627 117.953 14.232C117.633 13.9013 117.382 13.4747 117.201 12.952C117.03 12.4187 116.945 11.784 116.945 11.048C116.945 10.3547 117.036 9.75733 117.217 9.256C117.409 8.744 117.665 8.32267 117.985 7.992C118.316 7.66133 118.694 7.416 119.121 7.256C119.558 7.096 120.017 7.016 120.497 7.016C121.34 7.016 122.001 7.27733 122.481 7.8C122.961 8.32267 123.201 9.10133 123.201 10.136ZM120.305 8.584C119.9 8.584 119.564 8.728 119.297 9.016C119.041 9.304 118.902 9.736 118.881 10.312H121.393C121.404 10.2373 121.409 10.1733 121.409 10.12C121.409 10.056 121.409 9.99733 121.409 9.944C121.409 9.528 121.313 9.19733 121.121 8.952C120.929 8.70667 120.657 8.584 120.305 8.584Z"
              />
            </svg>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <ColorModeSwitcher justifySelf="flex-end" display={{ base: 'none', md: 'flex' }} />
          <LanguageSelector />
          <Button display="none" colorScheme="primary">
            Anmelden
          </Button>
          {/* <HyperThemeEditor /> */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const greenHex = Primary();

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                padding={2}
                as={NavLink}
                to={`${homeURL}${navItem.href}` ?? '#'}
                fontSize={'lg'}
                fontWeight={500}
                color={linkColor}
                // activeStyle={{
                //   borderBottom: 'solid',
                //   borderBottomWidth: 4,
                //   borderBottomColor: greenHex,
                // }}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                  borderBottom: 'solid',
                  borderBottomWidth: 4,
                  borderBottomColor: greenHex,
                }}>
                {i18n._(navItem.label)}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'xl'} bg={popoverContentBgColor} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={ReactLink}
      to={`${homeURL}${href}`}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.700')}>
      <Stack p={4} display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>

      <Box display="flex" alignItems="center" width="100%" height="auto" borderTop="1px solid gray">
        <Spacer flex={1} />
        <Text>Dark mode:</Text>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Box>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={NavLink}
        to={`${homeURL}${href}` ?? '#'}
        justify={'space-between'}
        align={'center'}
        // activeStyle={{
        //   borderBlock: 'solid',
        //   borderBlockWidth: 2,
        //   borderBlockColor: greenHex,
        //   marginBlock: -2,
        // }}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight="bold">{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={C_DarkGray()} align={'start'}>
          {children &&
            children.map((child) => (
              <Link as={ReactLink} key={child.label} py={2} to={`${homeURL}${child.href}`}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: t`Lösungsfinder`,
    href: '/' + Routes.SolutionExplorer,
  },
  {
    label: t`Beratungsangebote`,
    href: '/' + Routes.ConsultationOffers,
  },
  {
    label: '🏎',
    href: '/short',
    children: [
      {
        label: '🦠',
        href: '/' + Routes.SolutionExplorer + '?id=ceybyumxibs0',
      },
      {
        label: '🛩',
        href: '/' + Routes.PossibleEntitlements + '?id=cf4hcjzx9bk0',
      },
    ],
  },
];
