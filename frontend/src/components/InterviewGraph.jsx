import React from 'react'
import { motion } from "motion/react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

function CustomTooltip({ active, payload, color }) {
    if (active && payload?.length) {
        return (
            <div className='bg-ink-soft border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white shadow-2xl'>
                <p className="text-white/40 mb-0.5">{payload[0]?.payload?.skill}</p>
                <p className="font-display font-semibold" style={{ color }}>{payload[0]?.value}%</p>

            </div>
        )
    }
}
function RadarCard({ title, data, color, index }) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className='relative overflow-hidden bg-ink border border-white/8 rounded-lg p-3 md:p-4
                 flex flex-col hover:border-white/15 transition-colors'>

            <div className='relative'>
                <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
                        <PolarGrid stroke="rgba(255,255,255,0.08)" gridType="circle" />
                        <PolarAngleAxis dataKey="skill"
                            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500 }} />
                        <Radar
                            name={title}
                            dataKey="score"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.18}
                            strokeWidth={2}
                            dot={{ r: 2.5, fill: color, strokeWidth: 0 }} />
                        <Tooltip content={<CustomTooltip color={color} />}/>
                    </RadarChart>
                </ResponsiveContainer>
                <div className='flex items-center justify-center gap-1.5 mt-2'>
                    <span className='w-1.5 h-1.5 rounded-full shrink-0' style={{ backgroundColor: color }} />
                    <p className='font-display text-white font-medium text-xs'>
                        {title}
                    </p>
                </div>
            </div>

        </motion.div>

    )
}

function InterviewGraph({ technicalData, hrData, technicalCount, hrCount }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            <RadarCard title={`Technical Interviews (${technicalCount})`}
                data={technicalData} color="#f0a63d" index={0}
            />
            <RadarCard title={`HR Interviews (${hrCount})`}
                data={hrData} color="#4fb8a8" index={1}
            />

        </div>
    )
}

export default InterviewGraph