import React from 'react'
import { motion } from "motion/react"
function Statbox({ label, value, sub, subHighlight, index = 0 }) {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.4, delay: index * 0.08 }}

      whileHover={{ y: -4 }}
    className='relative overflow-hidden bg-ink border border-white/8 rounded-lg p-3 md:p-4 flex flex-col gap-1.5 hover:border-amber/25 transition-colors'>

        <div className='relative flex items-center gap-1.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-amber shrink-0'/>
            <p className='text-white/45 text-[11px] font-medium'>{label}</p>
        </div>

        <p className='relative font-display text-white text-xl md:text-2xl font-semibold tracking-tight'>{value}</p>

        {sub && (
            <div className='relative flex items-center gap-1.5 mt-0.5 flex-wrap'>
                {subHighlight && (
                    <div className='text-[9px] font-semibold bg-amber/15 text-amber-soft px-1.5 py-0.5 rounded'>{subHighlight}</div>
                )}

                <span className='text-white/30 text-[9px] md:text-[11px]'>{sub}</span>

            </div>
        )}


    </motion.div>
  )
}

export default Statbox