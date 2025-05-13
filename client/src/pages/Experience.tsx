import React from "react";
import { Timeline, Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperiencesProps {
  experiences: Experience[];
}

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <Title level={2} className="!text-gray-800 !mb-6">
        💼 Tajriba
      </Title>
      <Card>
        <Timeline>
          {experiences.map((exp, index) => (
            <Timeline.Item key={index} color="blue">
              <Title level={4} className="!text-gray-700">
                {exp.title}
              </Title>
              <Text className="text-gray-600 text-sm">
                {exp.company} • {exp.duration}
              </Text>
              <Paragraph className="text-gray-600 mt-2">
                {exp.description}
              </Paragraph>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </motion.div>
  );
};

export default Experiences;
