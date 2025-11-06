import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const AnimatedComponentsExample: React.FC = () => {
  // 页面切换动画变体
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // 按钮悬停变体
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 0px 8px rgba(99, 102, 241, 0.5)' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="p-6 bg-gray-900 rounded-lg"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      <motion.h2
        className="text-xl font-bold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        动画效果示例
      </motion.h2>

      <motion.p
        className="text-gray-300 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        以下是在交易平台中可能用到的动画效果示例：
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 页面切换动画示例 */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>页面切换动画</CardTitle>
              <CardDescription>平滑的页面进入和退出效果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                使用 Framer Motion 实现的页面切换动画，提供流畅的用户体验。
              </p>
              <motion.div
                className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-bold">悬停查看效果</span>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 交互反馈动画示例 */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>交互反馈动画</CardTitle>
              <CardDescription>按钮和元素的交互反馈效果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">按钮悬停、点击和加载状态的动画反馈。</p>
              <div className="flex flex-wrap gap-2">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button>悬停效果</Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button variant="secondary">次要按钮</Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button variant="outline">轮廓按钮</Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 数据加载动画示例 */}
      <motion.div
        className="mt-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>数据加载动画</CardTitle>
            <CardDescription>加载状态的视觉反馈</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">在数据加载过程中提供视觉反馈，提升用户体验。</p>
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.4,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="mt-6 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>使用 Framer Motion 实现流畅的动画效果</li>
          <li>页面切换动画提供良好的视觉过渡体验</li>
          <li>交互反馈动画增强用户操作的感知</li>
          <li>数据加载动画在等待过程中提供视觉反馈</li>
          <li>所有动画都经过优化，确保性能和用户体验</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedComponentsExample;
