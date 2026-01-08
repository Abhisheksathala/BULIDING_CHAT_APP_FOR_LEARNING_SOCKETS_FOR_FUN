import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { fileFormat } from '../lib/features';

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const samesender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <>
      {!samesender && (
        <Typography
          fontWeight={600}
          color={'black'}
          backgroundColor={''}
          paddingX={'0.5rem'}
          borderRadius={'0.2rem'}
          variant="caption"
        >
          {sender.name}
        </Typography>
      )}
      <div
        className="mb-4"
        style={{
          alignSelf: samesender ? 'flex-end' : 'flex-start',
          backgroundColor: samesender ? 'white' : 'blue',
          color: samesender ? 'black' : 'white',
          borderRadius: '5px',
          padding: '0.2rem',
          width: 'fit-content',
        }}
      >
        {content && <Typography>{content}</Typography>}
        {timeAgo && (
          <div className="flex items-center justify-end">
            {' '}
            <Typography variant="caption" color={'text.secondary'}>
              {timeAgo}
            </Typography>
          </div>
        )}

        {attachments.length > 0 &&
          attachments.map(({ url, public_id }, index) => {

            const file = fileFormat(url)

            return (
              <>
                <Box key={index}>
                  <a
                    href=""
                    target="_blank"
                    download
                    style={{
                      color: 'black',
                    }}
                  >


                  </a>
                </Box>
              </>
            );
          })}
      </div>
    </>
  );
};

export default memo(MessageComponent);
